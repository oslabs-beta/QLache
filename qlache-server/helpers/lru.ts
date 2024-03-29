import { DoublyLinkedListVal } from "./doublyLL";

export class LRU {
  list: DoublyLinkedListVal;
  cache: object;
  capacity: number;

  constructor(capacity: number) {
    this.list = new DoublyLinkedListVal();
    this.capacity = capacity;
    this.cache = {};
  }

  get(key: string): object | undefined {
    if (this.cache.hasOwnProperty(key)) {
      const value = this.cache[key].value;
      this.list.findAndDelete(this.cache[key]);
      this.cache[key] = this.list.add(key, value);

      return value;
    } else return;
  }

  post(key: string, value: object): void {
    if (this.list.length === this.capacity) {
      const deletedVal = this.list.deleteFromTail();
      if (deletedVal) delete this.cache[deletedVal.key];
    }
    const newNode = this.list.add(key, value);
    this.cache[key] = newNode;
  }
}
