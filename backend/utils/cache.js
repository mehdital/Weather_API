import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
  max: 100,
  ttl: 3600000,
  updateAgeOnGet: true
});

export default cache;
