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
    console.log("in qlache query middleware");
    const document = parse(req.body.query);
    const query: string = print(document);

    // check if cache contains the key
    const value: object | undefined = this.evictionPolicy.get(query);
    if (value === undefined) {
      console.log("cache miss, making request to api");

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
          // console.log(res);
          const queryResponse: object = data;
          res.locals.queryRes = queryResponse;
          console.log("this is res.locals", res.locals.queryRes);
          console.log(
            "this should be the same as above",
            this.evictionPolicy.cache[query].value
          );
          return next();
          // console.log('almost there, got a response from the api, no way we get to this point on try number 1', res)
        });
    } else {
      res.locals.queryRes = value;
      return next();
    }
  }

  setEvictionPolicy(evictionPolicy: string) {
    console.log("about to enter switch statement");
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
/* theoretical use case

user will instantiate QLache, passing in desired options

e.g.
const cache = new Qlache(schema, LRU, 50)

user will include .query, a method of the QLache class, in the .use method of their server
    this method:
        1. grabs query string from req body
        2. checks cache for query string and, if found, returns value on res.locals
        3. if query string is not found...
            a. .query method invokes GQL's included graphql method to query DB
            b. the post method of the eviction wrapper is called (which takes care of all LL logic), passing in the query result
            c. the query response is sent back on res.locals

e.g.
app.use(/graphql, cache.query, (req, res) => {
    need to tell user to access res.locals.queryRes to retrieve data - any other way of achieving this?
})

*/
