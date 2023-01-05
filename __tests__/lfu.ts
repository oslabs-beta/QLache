const { LFU }  = require('../qlache-server/helpers/lfu');


describe('LFU\'s method testing', () => {
  const lfu = new LFU(3);
  it('Should add a valNode to cache using post method', () => {
    lfu.post('key1', { data: { name: 'a' } });
    expect(lfu.cache.key1.value).toEqual({ data: { name: 'a' } });
  });

  it('Should retrieve valNode when key is passed in get method', () => {
    const value = lfu.get('key1');
    expect(value).toEqual({ data: { name: 'a' } });
    expect(lfu.cache.key1.parent.freqValue).toEqual(2);
    expect(lfu.list.head.freqValue).toEqual(2);
  
  });

  it('Should rid of the least frequently used key from cache', () => {
    lfu.post('key2', { data: { name: 'b' } });
    lfu.post('key3', { data: { name: 'c' } });

    lfu.get('key1');
    lfu.get('key2');
    lfu.get('key2');

    

    lfu.post('key4', { data: { name: 'd' } });

    const value = lfu.get('key3');
    
    expect(value).toEqual(undefined);

  });
});

