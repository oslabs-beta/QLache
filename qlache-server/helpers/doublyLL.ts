//create the value linked list constructor function with its methods

export class ValNode {
  next: ValNode | null;
  prev: ValNode | null;
  parent: FreqNode | null;
  value: any;
  key: string;

  constructor(key: string, value: any) {
    this.next = null;
    this.prev = null;
    this.parent = null;
    this.value = value;
    this.key = key;
  }
}

export class DoublyLinkedListVal {
  head: ValNode | null;
  tail: ValNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(key: string, value: any, parent: FreqNode | null) {
    const node: ValNode = new ValNode(key, value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.length++;
    } else {
      this.head.parent = parent;
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      this.length++;
    }
    return this.length;
  }

  // addFU(key: string, value: any, parent: FreqNode) {
  //   const node: ValNode = new ValNode(key, value);
  //   if (!this.head) {
  //     this.head = node;
  //     this.tail = node;
  //     this.length++;
  //   } else {
  //     node.next = this.head;
  //     this.head.parent = parent;
  //   }
  // }

  delete() {
    if (!this.head || !this.tail) return;
    else {
      const deleted = this.tail;
      this.tail = deleted.prev;
      if (this.tail) this.tail.next = null;
      return deleted;
    }
  }
  findAndDelete(node: ValNode) {
    if (node.prev) {
      const nextNode = node.next;
      node.prev.next = nextNode;
      if (nextNode) {
        nextNode.prev = node.prev;
      }
    }
  }
}
//create the frequency linked list constructor function with its methods

export class FreqNode {
  next: FreqNode | null;
  prev: FreqNode | null;
  freqValue: number;
  list: DoublyLinkedListVal;

  constructor(freqValue: number) {
    this.next = null;
    this.prev = null;
    this.freqValue = freqValue;
  }
}

export class DoublyLinkedListFreq {
  head: FreqNode | null;
  tail: FreqNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }
  
  addFreq(key: string, value: any){
   
    if(!this.head) {
        this.head = new FreqNode(1);
        this.tail = this.head;
    }
    
  }
}
