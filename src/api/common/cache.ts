import NodeCache from 'node-cache';
import { mapGetListClothes } from '../../../pages/api/[gender]/[categoryName]';
import { USE_CACHE } from '../constants';

export const stdCacheTTL = 86400;

export const clothesCache = USE_CACHE
  ? new NodeCache({ stdTTL: stdCacheTTL, checkperiod: 600 })
  : {
      get: () => undefined,
      set: () => undefined,
      getTtl: () => undefined,
      on: () => undefined,
    };

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
