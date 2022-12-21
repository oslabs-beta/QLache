"use strict";
exports.__esModule = true;
exports.LFU = void 0;
var doublyLL_1 = require("./doublyLL");
var LFU = /** @class */ (function () {
    function LFU(capacity) {
        this.list = new doublyLL_1.DoublyLinkedListFreq();
        this.capacity = capacity;
        this.cache = {};
        this.totalValNodes = 0;
    }
    LFU.prototype.get = function (key) {
        // check if it exists in cache
        if (this.cache.hasOwnProperty(key)) {
            var valNode = this.cache[key];
            var freqNode = valNode.parent;
            if (freqNode.next.freqValue === freqNode.freqValue + 1) {
                valNode.shiftVal(freqNode.next);
            }
            else {
                var newParent = this.list.addFreq(freqNode);
                valNode.shiftVal(newParent);
            }
            return valNode.value; // refactor choose val or value and stay consistent
        }
        else
            return;
    };
    LFU.prototype.post = function (key, value) {
        var _a, _b;
        if (this.totalValNodes === this.capacity) {
            (_a = this.list.head) === null || _a === void 0 ? void 0 : _a.valList["delete"]();
            this.totalValNodes--;
        }
        var valNode = new doublyLL_1.ValNode(key, value);
        this.cache[key] = valNode;
        if (((_b = this.list.head) === null || _b === void 0 ? void 0 : _b.freqValue) !== 1 || this.list.head === null) {
            valNode.shiftVal(this.list.addFreq());
        }
        else {
            valNode.shiftVal(this.list.head);
        }
        this.totalValNodes++;
    };
    return LFU;
}());
exports.LFU = LFU;
;
