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

  get(key: string): object | undefined {
    // check if it exists in cache
    if (this.cache.hasOwnProperty(key)) {
      const valNode = this.cache[key]
      const freqNode = valNode.parent;
      if (freqNode.next && freqNode.next.freqValue === freqNode.freqValue + 1) {
        valNode.shiftVal(freqNode.next, this.list);
      } else {
        const newParent = this.list.addFreq(freqNode);
        valNode.shiftVal(newParent, this.list);
      }
      return valNode.value; // refactor choose val or value and stay consistent
    } else return;
  }

  post(key: string, value: object): void {
    if (this.totalValNodes === this.capacity){
      const deletedVal = this.list.head?.valList.deleteFromTail();
      
      if (deletedVal) delete this.cache[deletedVal.key];
      if (!this.list.head?.valList.head && deletedVal?.parent) this.list.deleteFreq(deletedVal.parent);
      this.totalValNodes--;
    }
    const valNode: ValNode = new ValNode(key, value);
    this.cache[key] = valNode;
    if (this.list.head?.freqValue !== 1 || this.list.head === null){
      
      valNode.shiftVal(this.list.addFreq(), this.list);
      
    } else {
      valNode.shiftVal(this.list.head, this.list)
    }
    this.totalValNodes++;
  }
};