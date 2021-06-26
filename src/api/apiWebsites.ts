import { ClotheInfo } from '../types/ClotheInfo';
import { ClotheItem } from '../types/ClotheItem';
import { GetClothesOptions } from '../types/GetClothesOptions';
import { getWebsiteById, Website, WebsiteId } from '../websites';
import { getClotheInfoCoolShirtz } from './coolShirtz/getClotheInfoCoolShirtz';
import { getClothesCoolShirtz } from './coolShirtz/getClothesCoolShirtz';
import { searchCoolShirtz } from './coolShirtz/searchCoolShirtz';
import { getClotheInfoCultureKings } from './cultureKings/getClotheInfoCultureKings';
import { getClothesCultureKings } from './cultureKings/getClothesCultureKings';
import { searchCultureKings } from './cultureKings/searchCultureKings';
import { getClothesUniversalStore } from './universalStore/getClothesUniversalStore';

export type getClothesFunction = (
  cid: string,
  requestOptions: GetClothesOptions
) => Promise<Partial<ClotheItem>[]>;

export type getClotheInfoFunction = (clotheUrl: URL) => Promise<ClotheInfo>;

export type searchFunction = (
  query: string,
  requestOptions: GetClothesOptions
) => Promise<Partial<ClotheItem>[]>;

export interface apiWebsite extends Website {
  getClothesFunction?: getClothesFunction;
  getClotheInfoFunction?: getClotheInfoFunction;
  searchFunction?: searchFunction;
}

export const apiWebsites: apiWebsite[] = [
  {
    ...getWebsiteById(WebsiteId.COOL_SHIRTZ),
    getClothesFunction: getClothesCoolShirtz,
    getClotheInfoFunction: getClotheInfoCoolShirtz,
    searchFunction: searchCoolShirtz,
  },
  {
    ...getWebsiteById(WebsiteId.CULTURE_KINGS),
    getClothesFunction: getClothesCultureKings,
    getClotheInfoFunction: getClotheInfoCultureKings,
    searchFunction: searchCultureKings,
  },
  {
    ...getWebsiteById(WebsiteId.UNIVERSAL_STORE),
    getClothesFunction: getClothesUniversalStore,
  },
];
