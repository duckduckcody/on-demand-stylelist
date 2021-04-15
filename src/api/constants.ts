import { getClothesAsos } from './asos/getClothesAsos';
import { getClothesCoolShirtz } from './coolShirtz/getClothesCoolShirtz';
import { getClothesCultureKings } from './cultureKings/getClothesCultureKings';
import { ClotheItem, GetClothesOptions } from './getClothes';

export const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
};

export const DEFAULT_RESPONSE_LIMIT = 10;

export const USE_CACHE = false;

export type getClothesFunction = (
  cid: string,
  requestOptions: GetClothesOptions
) => Promise<Partial<ClotheItem>[]>;

interface Website {
  id: number;
  name: string;
  function: getClothesFunction;
}

export const websites: Website[] = [
  { id: 4000, name: 'Cool Shirtz', function: getClothesCoolShirtz },
  { id: 4001, name: 'Asos', function: getClothesAsos },
  { id: 4002, name: 'Culture Kings', function: getClothesCultureKings },
];

export type StaticSafeWebsite = Omit<Website, 'function'>;
export const staticSafeWebsites: StaticSafeWebsite[] = websites.map(
  (website) => ({
    id: website.id,
    name: website.name,
  })
);
