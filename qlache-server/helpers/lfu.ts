import { DoublyLinkedListVal, DoublyLinkedListFreq, ValNode } from "./doublyLL";

export class LFU {
  list: DoublyLinkedListFreq;
  cache: any;
  capacity: number;
  constructor(capacity: number) {
    this.list = new DoublyLinkedListFreq();
    this.capacity = capacity;
    this.cache = {};
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
    if (this.list.head?.freqValue !== 1){
      this.list.addFreq()
    } 
    if (!this.cache.hasOwnProperty(key)) {
      
    }


  }

};