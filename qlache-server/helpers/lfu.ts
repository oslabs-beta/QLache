import { DoublyLinkedListVal, DoublyLinkedListFreq } from "./doublyLL";

export class LFU {
  list: DoublyLinkedListFreq;
  cache: any;
  capacity: number;
  constructor(capacity: number) {
    this.list = new DoublyLinkedListFreq();
    this.capacity = capacity;
    this.cache = {};
  }

};