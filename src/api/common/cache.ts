import NodeCache from 'node-cache';
import { USE_CACHE } from '../constants';

export const clothesCache = USE_CACHE
  ? new NodeCache({ stdTTL: 100, checkperiod: 120 })
  : { get: () => undefined, set: () => undefined };
