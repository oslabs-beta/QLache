const { LRU } = require('../qlache-server/helpers/lru');

describe('LRU\'s method testing', () => {
  const lru = new LRU(3);
  it('Should add a valNode to cache using post method', () => {
    lru.post('key1', { data: { name: 'a' } });
    expect(lru.cache.key1.value).toEqual({ data: { name: 'a' } });
  });

  it('Should retrieve valNode when key is passed in get method', () => {
    const value = lru.get('key1');
    expect(value).toEqual({ data: { name: 'a' } });
   //console.log(lru.cache);
  
  });

  it('Should rid of the least recently used key from cache', () => {
    lru.post('key2', { data: { name: 'b' } });
    lru.post('key3', { data: { name: 'c' } });

    
    lru.get('key1');
    lru.get('key2');
    lru.get('key2');
    lru.post('key4', { data: { name: 'd' } });
    
    // console.log(Object.keys(lru.cache), lru.list);

    const value = lru.get('key3');
    
    expect(value).toEqual(undefined);

  });
});