import NodeCache from 'node-cache';
import { USE_CACHE } from '../constants';
import { mapGetListClothes } from './mapGetListClothes';

export const stdCacheTTL = 86400;

export const clothesCache = USE_CACHE
  ? new NodeCache({ stdTTL: stdCacheTTL, checkperiod: 600 })
  : {
      get: () => undefined,
      set: () => undefined,
      getTtl: () => undefined,
      on: () => undefined,
    };

// get first page on cache expiry
clothesCache.on('expired', async (key) => {
  const [type, websiteId, cid, sort] = key.split('~');

  if (type === 'list') {
    await mapGetListClothes(cid, [websiteId], {
      sort,
      page: 1,
      limit: 1,
    });
  }
});
