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
    GraphQLNonNull
  } from 'graphql';

class Qlache {
    schema: GraphQLSchema;
    evictionType: LRU | LFU;
    capacity: number;

    constructor(schema, type, capacity, ) {
        this.schema = schema
        this.evictionType = this.setEvicType(type)
        this.capacity = capacity;
    }
    query(req, res, next) {
        const query = req.body.query;
        
    }

    setEvicType(evictionType: string){
        switch (evictionType){
            case "LFU":
                return new LFU(this.capacity);
            case "LRU": 
                return new LRU(this.capacity);
            default:
                return new LRU(this.capacity);
                //consider adding error here
        }
    }
}

// const cacher = new Qlache(schema, LRU, 50)

// app.use(/graphql, cacher.query, (req, res) => {
    
// })












