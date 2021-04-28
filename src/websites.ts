import { ASOS_BASE_URL } from './api/asos/constants';
import { getClotheInfoAsos } from './api/asos/getClotheInfoAsos';
import { getClothesAsos } from './api/asos/getClothesAsos';
import { COOL_SHIRTZ_BASE_URL } from './api/coolShirtz/constants';
import { getClotheInfoCoolShirtz } from './api/coolShirtz/getClotheInfoCoolShirtz';
import { getClothesCoolShirtz } from './api/coolShirtz/getClothesCoolShirtz';
import { CULTURE_KINGS_URL } from './api/cultureKings/constants';
import { getClothesCultureKings } from './api/cultureKings/getClothesCultureKings';
import { ClotheInfo, ClotheItem, GetClothesOptions } from './api/getClothes';

export type getClothesFunction = (
  cid: string,
  requestOptions: GetClothesOptions
) => Promise<Partial<ClotheItem>[]>;

export type getClotheInfoFunction = (clotheLink: string) => Promise<ClotheInfo>;

interface Website {
  id: number;
  name: string;
  baseUrl: string;
  getClothesFunction: getClothesFunction;
  getClotheInfoFunction?: getClotheInfoFunction;
}

export const websites: Website[] = [
  {
    id: 4000,
    name: 'Cool Shirtz',
    baseUrl: COOL_SHIRTZ_BASE_URL,
    getClothesFunction: getClothesCoolShirtz,
    getClotheInfoFunction: getClotheInfoCoolShirtz,
  },
  {
    id: 4001,
    name: 'Asos',
    baseUrl: ASOS_BASE_URL,
    getClothesFunction: getClothesAsos,
    getClotheInfoFunction: getClotheInfoAsos,
  },
  {
    id: 4002,
    name: 'Culture Kings',
    baseUrl: CULTURE_KINGS_URL,
    getClothesFunction: getClothesCultureKings,
  },
];

export interface WebsiteData {
  id: number;
  name: string;
}

export const websiteData: WebsiteData[] = websites.map((website) => ({
  id: website.id,
  name: website.name,
}));
