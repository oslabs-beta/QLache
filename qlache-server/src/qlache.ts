import { LRU } from "../helpers/lru.js";
import { LFU } from "../helpers/lfu.js";
import { MRU } from "../helpers/mru";
import { parse, print } from "graphql/language";

interface options {
  cache?: string;
  port?: number;
  hostname?: string;
  expire?: string | number;
  respondOnHit?: boolean;
  capacity?: number;
}

class Qlache {
  apiURL: string;
  evictionPolicy: LRU | LFU | MRU;
  capacity: number;

  constructor(apiURL, type, capacity) {
    this.apiURL = apiURL;
    this.evictionPolicy = this.setEvictionPolicy(type);
    this.capacity = capacity;
    this.query = this.query.bind(this);
  }

  query(req, res, next) {
    const document = parse(req.body.query);
    const query: string = print(document);

    const value: object | undefined = this.evictionPolicy.get(query);
    if (value === undefined) {
      fetch(this.apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.evictionPolicy.post(query, data);
          const queryResponse: object = data;
          res.locals.queryRes = queryResponse;
          return next();
        });
    } else {
      res.locals.queryRes = value;
      return next();
    }
  }

  setEvictionPolicy(evictionPolicy: string) {
    switch (evictionPolicy) {
      case "LFU":
        return new LFU(this.capacity);
      case "LRU":
        return new LRU(this.capacity);
      case "MRU":
        return new MRU(this.capacity);
      default:
        return new LRU(this.capacity);
    }
  }
}

export default Qlache;
