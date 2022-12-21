"use strict";
exports.__esModule = true;
var lru_1 = require("../helpers/lru");
var lfu_1 = require("../helpers/lfu");
var graphql_1 = require("graphql");
var Qlache = /** @class */ (function () {
    function Qlache(schema, type, capacity) {
        this.schema = schema;
        this.evictionPolicy = this.setEvictionPolicy(type);
        this.capacity = capacity;
    }
    Qlache.prototype.query = function (req, res, next) {
        var _this = this;
        var query = req.body.query;
        // check if cache contains the key 
        var value = this.evictionPolicy.get(query);
        if (value === undefined) {
            //fetch request to GQL - need to have access to schema
            (0, graphql_1.graphql)({ schema: this.schema, source: query })
                .then(function (response) {
                var queryRes = response;
                _this.evictionPolicy.post(query, queryRes);
                res.locals.queryRes = queryRes;
                return next();
            });
            //design error handling here - needs to integrate with user's existing error handling?
            // .catch(err => {
            //     return next()
            // });
        }
        res.locals.queryRes = value;
        return next();
    };
    Qlache.prototype.setEvictionPolicy = function (evictionPolicy) {
        switch (evictionPolicy) {
            case "LFU":
                return new lfu_1.LFU(this.capacity);
            case "LRU":
                return new lru_1.LRU(this.capacity);
            default:
                return new lru_1.LRU(this.capacity);
        }
    };
    return Qlache;
}());
exports["default"] = Qlache;
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
