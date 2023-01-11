//create the value linked list constructor function with its methods

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
    //reassign links on prev and next val nodes
    // if only one node exists then nullify the valList
    if (!this.prev && !this.next && this.parent) {
      freqLL.deleteFreq(this.parent);
    }
    // check if this is the head but not the only valNode in the valList
    else if (!this.prev) {
      if (this.parent) {
        this.parent.valList.head = this.next;
        if (this.next) {
          this.next.prev = null;
        }
      }
    }
    // check if this is the tail but not the only valNode in the valList
    else if (!this.next) {
      if (this.parent) {
        this.parent.valList.tail = this.prev;
        if (this.prev) {
          this.prev.next = null;
        }
      }
    }
    // else represents if this is not the head or tail but a valNode in between the valList
    else {
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
      // this.parent.valList contains the doubly linked list of the valNodes
      // add this valNode to the head of the list
      this.parent.valList.head.prev = this;
      //
      this.next = this.parent.valList.head;
      // reassign head to be this valNode
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
    //console.log('im length after adding', this.length, key);
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

//create the frequency linked list constructor function with its methods

export class DoublyLinkedListFreq {
  head: FreqNode | null;
  tail: FreqNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  // calling this method assuming next FreqNode doesn't exist
  addFreq(prevNode?: FreqNode): FreqNode {
    //not positive we'll be able to use this same logic for adding to beginning of list

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

    // if node.next is truthy it means it is not the tail and prev node of its next needs to be reassigned, else reassign tail

    //non-ternary code
    // if(node.next) node.next.prev = node;
    // else this.tail = node;

    node.next ? (node.next.prev = node) : (this.tail = node);

    return node;
  }

  deleteFreq(currNode: FreqNode): void {
    // passed in node is the head and tail
    if (!currNode.prev && !currNode.next) {
      this.head = null;
      this.tail = null;
    } 
    // passed in node is the tail
    else if (!currNode.next && currNode.prev) {
      this.tail = currNode.prev;
      this.tail.next = null;
    }
    else if (!currNode.prev && currNode.next) {
      this.head = currNode.next;
      this.head.prev = null;
    }
    else if (currNode.next && currNode.prev) {
      currNode.prev.next = currNode.next;
      currNode.next.prev = currNode.prev;
    }
  }
}
