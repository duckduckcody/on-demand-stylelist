import { uniqBy } from 'lodash';
import {
  BaseWebsite,
  baseWebsites,
  getBaseWebsiteById,
  WebsiteId,
} from '../baseWebsites';
import { getClotheInfoAsos } from './asos/getClotheInfoAsos';
import { getClothesAsos } from './asos/getClothesAsos';
import { getClotheInfoCoolShirtz } from './coolShirtz/getClotheInfoCoolShirtz';
import { getClothesCoolShirtz } from './coolShirtz/getClothesCoolShirtz';
import { getClotheInfoCultureKings } from './cultureKings/getClotheInfoCultureKings';
import { getClothesCultureKings } from './cultureKings/getClothesCultureKings';
import { ClotheInfo, ClotheItem, GetClothesOptions } from './getClothes';

export type getClothesFunction = (
  cid: string,
  requestOptions: GetClothesOptions
) => Promise<Partial<ClotheItem>[]>;

export type getClotheInfoFunction = (clotheUrl: URL) => Promise<ClotheInfo>;

export interface ServerSideWebsites extends BaseWebsite {
  getClothesFunction?: getClothesFunction;
  getClotheInfoFunction?: getClotheInfoFunction;
}

export const serverSideWebsites: ServerSideWebsites[] = uniqBy(
  [
    {
      ...getBaseWebsiteById(WebsiteId.COOL_SHIRTZ),
      getClothesFunction: getClothesCoolShirtz,
      getClotheInfoFunction: getClotheInfoCoolShirtz,
    },
    {
      ...getBaseWebsiteById(WebsiteId.ASOS),
      getClothesFunction: getClothesAsos,
      getClotheInfoFunction: getClotheInfoAsos,
    },
    {
      ...getBaseWebsiteById(WebsiteId.CULTURE_KINGS),
      getClothesFunction: getClothesCultureKings,
      getClotheInfoFunction: getClotheInfoCultureKings,
    },
    ...baseWebsites,
  ],
  'id'
);
