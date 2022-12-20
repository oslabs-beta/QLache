import { DoublyLinkedListVal } from "./doublyLL";

export class LRU {
  list: DoublyLinkedListVal;
  cache: any;
  capacity: number;

  constructor(capacity: number) {
    this.list = new DoublyLinkedListVal();
    this.capacity = capacity;
    this.cache = {};
  }

  // returns the value if it exists or undefined and depending on which return, call other methods
  get(key: string) {
    if (this.cache.hasOwnProperty(key)) {
      const value = this.cache[key].value;
      this.list.findAndDelete(this.cache[key]);
      this.list.add(key, value, null);
      return value;
    } else return undefined;
  }

  post(key: string, value: any) {
    if (this.list.length === this.capacity) {
      this.list.delete();
    }
    const newNode = this.list.add(key, value, null);
    this.cache[key] = newNode;
  }
}
