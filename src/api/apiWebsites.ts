import { uniqBy } from 'lodash';
import { ClotheInfo } from '../types/ClotheInfo';
import { ClotheItem } from '../types/ClotheItem';
import { GetClothesOptions } from '../types/GetClothesOptions';
import { getWebsiteById, Website, WebsiteId, websites } from '../websites';
import { getClotheInfoAsos } from './asos/getClotheInfoAsos';
import { getClothesAsos } from './asos/getClothesAsos';
import { searchAsos } from './asos/searchAsos';
import { getClotheInfoCoolShirtz } from './coolShirtz/getClotheInfoCoolShirtz';
import { getClothesCoolShirtz } from './coolShirtz/getClothesCoolShirtz';
import { searchCoolShirtz } from './coolShirtz/searchCoolShirtz';
import { getClotheInfoCultureKings } from './cultureKings/getClotheInfoCultureKings';
import { getClothesCultureKings } from './cultureKings/getClothesCultureKings';
import { searchCultureKings } from './cultureKings/searchCultureKings';

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

export const apiWebsites: apiWebsite[] = uniqBy(
  [
    {
      ...getWebsiteById(WebsiteId.COOL_SHIRTZ),
      getClothesFunction: getClothesCoolShirtz,
      getClotheInfoFunction: getClotheInfoCoolShirtz,
      searchFunction: searchCoolShirtz,
    },
    {
      ...getWebsiteById(WebsiteId.ASOS),
      getClothesFunction: getClothesAsos,
      getClotheInfoFunction: getClotheInfoAsos,
      searchFunction: searchAsos,
    },
    {
      ...getWebsiteById(WebsiteId.CULTURE_KINGS),
      getClothesFunction: getClothesCultureKings,
      getClotheInfoFunction: getClotheInfoCultureKings,
      searchFunction: searchCultureKings,
    },
    ...websites,
  ],
  'id'
);
