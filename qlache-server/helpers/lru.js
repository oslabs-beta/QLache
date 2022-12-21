"use strict";
exports.__esModule = true;
exports.LRU = void 0;
var doublyLL_1 = require("./doublyLL");
var LRU = /** @class */ (function () {
    function LRU(capacity) {
        this.list = new doublyLL_1.DoublyLinkedListVal();
        this.capacity = capacity;
        this.cache = {};
    }
    // returns the value if it exists or undefined and depending on which return, call other methods
    LRU.prototype.get = function (key) {
        if (this.cache.hasOwnProperty(key)) {
            var value = this.cache[key].value;
            this.list.findAndDelete(this.cache[key]);
            this.list.add(key, value, null);
            return value;
        }
        else
            return undefined;
    };
    LRU.prototype.post = function (key, value) {
        if (this.list.length === this.capacity) {
            this.list["delete"]();
        }
        var newNode = this.list.add(key, value, null);
        this.cache[key] = newNode;
    };
    return LRU;
}());
exports.LRU = LRU;
