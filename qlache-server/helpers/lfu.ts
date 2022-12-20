import { DoublyLinkedListVal, DoublyLinkedListFreq, ValNode } from "./doublyLL";

export class LFU {
  list: DoublyLinkedListFreq;
  cache: any;
  capacity: number;
  totalValNodes: number;

  constructor(capacity: number) {
    this.list = new DoublyLinkedListFreq();
    this.capacity = capacity;
    this.cache = {};
    this.totalValNodes = 0;
  }

  get(key: string): undefined | number {
    // check if it exists in cache
    if (this.cache.hasOwnProperty(key)) {
      const valNode = this.cache[key]
      const freqNode = valNode.parent;
      if (freqNode.next.freqValue === freqNode.freqValue + 1) {
        valNode.shiftVal(freqNode.next);
      } else {
        const newParent = this.list.addFreq(freqNode);
        valNode.shiftVal(newParent);
      }
      return valNode.value; // refactor choose val or value and stay consistent
    } else return;
  }

  post(key: string, value: any) {
    if (this.totalValNodes === this.capacity){
      this.list.head?.valList.delete();
      this.totalValNodes--;
    }
    const valNode: ValNode = new ValNode(key, value);
    this.cache[key] = valNode;
    if (this.list.head?.freqValue !== 1 || this.list.head === null){
      valNode.shiftVal(this.list.addFreq());
    } else {
    valNode.shiftVal(this.list.head)
    }
    this.totalValNodes++;
  }
};