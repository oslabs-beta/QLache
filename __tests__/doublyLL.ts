const { ValNode, DoublyLinkedListVal, FreqNode, DoublyLinkedListFreq } = require('../qlache-server/helpers/doublyLL');


describe('DoublyLinkedListFreq\'s addFreq test', () => {

  const freqLL = new DoublyLinkedListFreq();
  
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

  //   const firstFreq = freqLL.addFreq();


  //   const last = new FreqNode(5);
  //   freqLL.head.next.next = last;
  //   freqLL.tail = last;

  // //it('Should add a new freqNode ')

  //   const addInBetween = freqLL.addFreq(newFreq);
  //   expect(addInBetween.freqValue).toEqual(3);
  //   expect(freqLL.head.next.next).toBe(addInBetween);
  //   expect(freqLL.head.next.next.next).toBe(last);
  //   expect(freqLL.tail).toBe(last);
  // })
  // it('Should delete a valNode from the end of the DoubleLinkedListVal', () => {
  //   const deleted = valLL.delete();
  //   expect(deleted).toEqual(new ValNode('key1', { data: { name: 'test1' } }));
  // });
  // it('Should move ValNode from its current FreqNode\'s parent to one FreqNode up as the new parent', () => {

  // });
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
    const deletedNode = valLL.delete();
    expect(deletedNode.key).toEqual('queryKey1');
    expect(deletedNode.value).toEqual({data: { name: 'a'} });
    expect(valLL.tail.key).toEqual('queryKey2');

  });

  it('Should remove valNode from the head of the valLL', () => {
    const deletedNode = valLL.deleteMRU();
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
    // valLL.findAndDelete(e);
    // expect(valLL.head.key).toEqual('queryKey2');
    // expect(valLL.head.next.key).toEqual('queryKey1');

    
    valLL.findAndDelete(valLL.head.next.next.next);

    expect(valLL.head.next.key).toEqual('queryKey2');
    expect(valLL.head.next.next).toBeNull();


  });

});

