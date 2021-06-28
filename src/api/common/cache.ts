import NodeCache from 'node-cache';
import { USE_CACHE } from '../constants';

export const stdCacheTTL = 86400;

export const clothesCache = USE_CACHE
  ? new NodeCache({ stdTTL: stdCacheTTL, checkperiod: 600 })
  : { get: () => undefined, set: () => undefined, getTtl: () => undefined };
