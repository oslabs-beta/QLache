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
