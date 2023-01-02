const { ValNode, DoublyLinkedListVal, FreqNode, DoublyLinkedListFreq } = require('../qlache-server/helpers/doublyLL');


describe('DoublyLinkedListFreq\'s methods test', () => {
  let freqLL;
  beforeEach(() => {

    freqLL = new DoublyLinkedListFreq();

  });


  
  it('Should add a new freqNode(1) as the head and when no args are passed and add a new freqNode with freqValue up one from the node that is passed in as an arg', () => {
    const newFreq = freqLL.addFreq();
    expect(newFreq.freqValue).toEqual(1);
    expect(newFreq).toBe(freqLL.head);
    expect(newFreq).toBe(freqLL.tail);
    expect(newFreq.next).toBe(null);
    expect(newFreq.prev).toBe(null);

    // it('should add a new freqNode with freqValue up one from the node that is passed in as an arg', () => {

    const secondFreq = freqLL.addFreq(newFreq);

    expect(secondFreq.freqValue).toEqual(2);
    expect(secondFreq.prev).toBe(newFreq);
    expect(freqLL.head.next).toBe(secondFreq);
    expect(secondFreq.next).toEqual(null);
    expect(freqLL.tail).toBe(secondFreq);
  });

  it('Should delete inputted freqNode', () => {
    const firstFreq = freqLL.addFreq();
    const secondFreq = freqLL.addFreq(firstFreq);
    const thirdFreq = freqLL.addFreq(secondFreq);
    const fourthFreq = freqLL.addFreq(thirdFreq);
    
    freqLL.deleteFreq(secondFreq);
    expect(freqLL.head.next).toBe(thirdFreq);

    freqLL.deleteFreq(firstFreq);
    expect(freqLL.head).toBe(thirdFreq);

    freqLL.deleteFreq(fourthFreq);
    expect(freqLL.tail).toBe(thirdFreq);
    expect(freqLL.head).toBe(thirdFreq);
    expect(freqLL.head.next).toBeNull();
    expect(freqLL.head.prev).toBeNull();

    freqLL.deleteFreq(thirdFreq);
    expect(freqLL.head).toBeNull();
    expect(freqLL.tail).toBeNull();
    
  });
});

describe('DoublyLinkedListVal methods test', () => {
  const valLL = new DoublyLinkedListVal();
  beforeAll(() => {
    const c = new ValNode('queryKey3', {data: { name: 'c'} });
    const b = new ValNode('queryKey2', {data: { name: 'b'} });
    const a = new ValNode('queryKey1', {data: { name: 'a'} });
    c.next = b;
    b.next = a;
    a.prev = b;
    b.prev = c;
    valLL.head = c;
    valLL.tail = a;

  });
  it('Should add ValNode to the head of ValLL with no FreqNode passed in', () => {
    const newNode = valLL.add('queryKey4', {data: { name: 'd'} });
    expect(valLL.head).toBe(newNode);
    expect(valLL.head.next.key).toEqual('queryKey3');
  });

  it('Should remove valNode from the tail of the ValLL', () => {
    const deletedNode = valLL.deleteFromTail();
    expect(deletedNode.key).toEqual('queryKey1');
    expect(deletedNode.value).toEqual({data: { name: 'a'} });
    expect(valLL.tail.key).toEqual('queryKey2');

  });

  it('Should remove valNode from the head of the valLL', () => {
    const deletedNode = valLL.deleteFromHead();
    expect(deletedNode.key).toEqual('queryKey4');
    expect(deletedNode.value).toEqual({data: { name: 'd'} });
    expect(valLL.head.key).toEqual('queryKey3');
  });

  it('Should remove passed in valNode from the linked list', () => {
    
    const d = valLL.add('queryKey4', {data: { name: 'd'} });
    const e = valLL.add('queryKey5', {data: { name: 'e'} });

    valLL.findAndDelete(d);
    expect(valLL.head.key).toEqual('queryKey5');
    expect(valLL.head.next.key).toEqual('queryKey3');
    
    // // does not find and delete if value passed in is the head
    valLL.findAndDelete(e);
    expect(valLL.head.key).toEqual('queryKey3');
    expect(valLL.head.next.key).toEqual('queryKey2');


    valLL.findAndDelete(valLL.tail);
    expect(valLL.head.key).toEqual('queryKey3');
    expect(valLL.head).toBe(valLL.tail);
    expect(valLL.head.next).toBeNull();
  });

});

describe('valLL and freqLL combined testing', () => {
  const freqLL = new DoublyLinkedListFreq();
  const freq1 = freqLL.addFreq();
  const freq2 = freqLL.addFreq(freq1);


  it('should add val node to passed in freq node', () => {
    const val1 = freq1.valList.add('key1', {data: { name: 'A'} }, freq1);
    expect(freq1.valList.head).toBe(val1);
    // expect(freq1.valList.head.next).toBe(val1);
    // expect(freq2.valList.head).toBe(val4);
    // expect(freq2.valList.head.next).toBe(val3);
  });

  it('should move val node to specified freq and remove from previous frequency', () => {
    const val2 = freq1.valList.add('key2', {data: { name: 'B'} }, freq1);
    const val3 = freq2.valList.add('key3', {data: { name: 'C'} }, freq2);
    const val4 = freq2.valList.add('key4', {data: { name: 'D'} }, freq2);
    val2.shiftVal(freq2, freqLL);
    console.log(freq1.valList);
    expect(freq2.valList.head).toBe(val2);
    expect(freq2.valList.head.next).toBe(val4);
    expect(freq1.valList.head.next).toBeNull();
    expect(freq1.valList.head).not.toBe(val2);
  })

  it('should delete freq node if only valNode is shifted', () => {
    freq1.valList.head.shiftVal(freq2, freqLL);
    expect(freq2.prev).toBeNull();
    expect(freqLL.head).toBe(freq2);
    expect(freqLL.tail).toBe(freq2);
  });
});