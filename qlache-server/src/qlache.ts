import {LRU} from '../helpers/lru';
import {LFU} from '../helpers/lfu';

// import {MRU} from '../helpers/mru';



interface options {
    cache?: string;
    port?: number;
    hostname?: string;
    expire?: string | number;
    respondOnHit?: boolean;
    capacity?: number;
  }

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    graphql
  } from 'graphql';

export default class Qlache {
    schema: GraphQLSchema;
    evictionPolicy: LRU | LFU;
    capacity: number;
    apiURL: string

    constructor(type: string, capacity: number, schema?, apiURL?: string ) {
        this.schema = schema
        this.evictionPolicy = this.setEvictionPolicy(type),
        this.capacity = capacity,
        this.apiURL = apiURL
    }

    query(req, res, next) {
        const query = req.body.query;
        // check if cache contains the key 
        const value: object | undefined = this.evictionPolicy.get(query);
        if (value === undefined){
            //fetch request to GQL - need to have access to schema
            if (this.schema) {
                graphql({schema: this.schema, source: query})
                .then((response) => {
                    const queryRes: object = response;
                    this.evictionPolicy.post(query, queryRes);
                    res.locals.queryRes = queryRes;
                    return next();
                })
                //design error handling here - needs to integrate with user's existing error handling?
                // .catch(err => {
                //     return next()
                // });
            }   
        }
        if (this.apiURL) {
            fetch(this.apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query
                }),
            })
            .then((res) => res.json())
            .then((res) => {
                this.evictionPolicy.post(query, res);
                console.log('almost there, got a response from the api, no way we get to this point on try number 1', res);
                return next();
            });
        }
        res.locals.queryRes = value;
        return next();
    }

    setEvictionPolicy(evictionPolicy: string){
        switch (evictionPolicy){
            case "LFU":
                return new LFU(this.capacity);
            case "LRU": 
                return new LRU(this.capacity);
            default:
                return new LRU(this.capacity);
        }
    }
}

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







