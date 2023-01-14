export class ValNode {
  next: ValNode | null;
  prev: ValNode | null;
  parent: FreqNode | null;
  value: object;
  key: string;

  constructor(key: string, value: object) {
    this.next = null;
    this.prev = null;
    this.parent = null;
    this.value = value;
    this.key = key;
  }

  shiftVal(newParent: FreqNode, freqLL: DoublyLinkedListFreq): void {
    if (!this.prev && !this.next && this.parent) {
      freqLL.deleteFreq(this.parent);
    } else if (!this.prev) {
      if (this.parent) {
        this.parent.valList.head = this.next;
        if (this.next) {
          this.next.prev = null;
        }
      }
    } else if (!this.next) {
      if (this.parent) {
        this.parent.valList.tail = this.prev;
        if (this.prev) {
          this.prev.next = null;
        }
      }
    } else {
      this.prev.next = this.next;
      this.next.prev = this.prev;
    }

    this.parent = newParent;
    if (!this.parent.valList.head) {
      this.parent.valList.head = this;
      this.parent.valList.tail = this;
      this.next = null;
      this.prev = null;
    } else {
      this.parent.valList.head.prev = this;
      this.next = this.parent.valList.head;
      this.parent.valList.head = this;
      this.prev = null;
    }
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

  add(key: string, value: object, parent?: FreqNode): ValNode {
    const node: ValNode = new ValNode(key, value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.length++;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      this.length++;
    }
    if (parent) this.head.parent = parent;
    return node;
  }

  deleteFromTail(): ValNode | undefined {
    if (!this.head || !this.tail) return;
    else {
      this.length--;
      const deleted = this.tail;
      if (this.head.next === null) {
        this.head = null;
        this.tail = null;
        return deleted;
      }
      this.tail = deleted.prev;
      if (this.tail) this.tail.next = null;
      return deleted;
    }
  }
  deleteFromHead(): ValNode | undefined {
    if (!this.head || !this.tail) return;
    else {
      this.length--;
      const deleted = this.head;
      if (this.head.next) {
        const updated = this.head.next;
        this.head.next.prev = null;
        this.head.next = null;
        this.head = updated;
      } else {
        this.head = null;
        this.tail = null;
      }
      return deleted;
    }
  }
  findAndDelete(node: ValNode): void {
    if (!node.next) {
      this.deleteFromTail();
      return;
    }
    if (node.prev) {
      const nextNode = node.next;
      node.prev.next = nextNode;
      if (nextNode) {
        nextNode.prev = node.prev;
      }
    } else this.deleteFromHead();
  }
}

export class FreqNode {
  next: FreqNode | null;
  prev: FreqNode | null;
  freqValue: number;
  valList: DoublyLinkedListVal;

  constructor(freqValue: number) {
    this.next = null;
    this.prev = null;
    this.freqValue = freqValue;
    this.valList = new DoublyLinkedListVal();
  }
}

export class DoublyLinkedListFreq {
  head: FreqNode | null;
  tail: FreqNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  addFreq(prevNode?: FreqNode): FreqNode {
    if (!prevNode) {
      const node = new FreqNode(1);
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      }
      return node;
    }

    const val = prevNode.freqValue + 1;
    const node: FreqNode = new FreqNode(val);
    node.next = prevNode.next;
    node.prev = prevNode;
    prevNode.next = node;
    node.next ? (node.next.prev = node) : (this.tail = node);

    return node;
  }

  deleteFreq(currNode: FreqNode): void {
    if (!currNode.prev && !currNode.next) {
      this.head = null;
      this.tail = null;
    } else if (!currNode.next && currNode.prev) {
      this.tail = currNode.prev;
      this.tail.next = null;
    } else if (!currNode.prev && currNode.next) {
      this.head = currNode.next;
      this.head.prev = null;
    } else if (currNode.next && currNode.prev) {
      currNode.prev.next = currNode.next;
      currNode.next.prev = currNode.prev;
    }
  }
}
