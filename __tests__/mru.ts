const { MRU } = require('../qlache-server/helpers/mru');

describe('MRU\'s method testing', () => {
  const mru = new MRU(3);
  it('Should add a valNode to cache using post method', () => {
    mru.post('key1', { data: { name: 'a' } });
    expect(mru.cache.key1.value).toEqual({ data: { name: 'a' } });
  });

  it('Should retrieve valNode when key is passed in get method', () => {
    const value = mru.get('key1');
    expect(value).toEqual({ data: { name: 'a' } });  
  });

  it('Should rid of the most recently used key from cache', () => {
    mru.post('key2', { data: { name: 'b' } });
    mru.post('key3', { data: { name: 'c' } });

    
    mru.get('key1');
    mru.get('key2');
    mru.get('key2');
    mru.post('key4', { data: { name: 'd' } });
    

    const value = mru.get('key4');
    
    expect(value).toEqual(undefined);
  });
});