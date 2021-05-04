import { uniqBy } from 'lodash';
import { ClotheInfo } from '../types/ClotheInfo';
import { ClotheItem } from '../types/ClotheItem';
import { GetClothesOptions } from '../types/GetClothesOptions';
import { getWebsiteById, Website, WebsiteId, websites } from '../websites';
import { getClotheInfoAsos } from './asos/getClotheInfoAsos';
import { getClothesAsos } from './asos/getClothesAsos';
import { getClotheInfoCoolShirtz } from './coolShirtz/getClotheInfoCoolShirtz';
import { getClothesCoolShirtz } from './coolShirtz/getClothesCoolShirtz';
import { getClotheInfoCultureKings } from './cultureKings/getClotheInfoCultureKings';
import { getClothesCultureKings } from './cultureKings/getClothesCultureKings';

export type getClothesFunction = (
  cid: string,
  requestOptions: GetClothesOptions
) => Promise<Partial<ClotheItem>[]>;

export type getClotheInfoFunction = (clotheUrl: URL) => Promise<ClotheInfo>;

export interface apiWebsite extends Website {
  getClothesFunction?: getClothesFunction;
  getClotheInfoFunction?: getClotheInfoFunction;
}

export const apiWebsites: apiWebsite[] = uniqBy(
  [
    {
      ...getWebsiteById(WebsiteId.COOL_SHIRTZ),
      getClothesFunction: getClothesCoolShirtz,
      getClotheInfoFunction: getClotheInfoCoolShirtz,
    },
    {
      ...getWebsiteById(WebsiteId.ASOS),
      getClothesFunction: getClothesAsos,
      getClotheInfoFunction: getClotheInfoAsos,
    },
    {
      ...getWebsiteById(WebsiteId.CULTURE_KINGS),
      getClothesFunction: getClothesCultureKings,
      getClotheInfoFunction: getClotheInfoCultureKings,
    },
    ...websites,
  ],
  'id'
);
