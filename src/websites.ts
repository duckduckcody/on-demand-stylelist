import { ASOS_BASE_URL, ASOS_LOGO } from './api/asos/constants';
import { getClotheInfoAsos } from './api/asos/getClotheInfoAsos';
import { getClothesAsos } from './api/asos/getClothesAsos';
import {
  COOL_SHIRTZ_BASE_URL,
  COOL_SHIRTZ_LOGO,
} from './api/coolShirtz/constants';
import { getClotheInfoCoolShirtz } from './api/coolShirtz/getClotheInfoCoolShirtz';
import { getClothesCoolShirtz } from './api/coolShirtz/getClothesCoolShirtz';
import {
  CULTURE_KINGS_LOGO,
  CULTURE_KINGS_URL,
} from './api/cultureKings/constants';
import { getClotheInfoCultureKings } from './api/cultureKings/getClotheInfoCultureKings';
import { getClothesCultureKings } from './api/cultureKings/getClothesCultureKings';
import { ClotheInfo, ClotheItem, GetClothesOptions } from './api/getClothes';

export type getClothesFunction = (
  cid: string,
  requestOptions: GetClothesOptions
) => Promise<Partial<ClotheItem>[]>;

export type getClotheInfoFunction = (clotheUrl: URL) => Promise<ClotheInfo>;

interface Website {
  id: number;
  name: string;
  baseUrl: string;
  logo?: string;
  getClothesFunction: getClothesFunction;
  getClotheInfoFunction?: getClotheInfoFunction;
}

export const websites: Website[] = [
  {
    id: 4000,
    name: 'Cool Shirtz',
    baseUrl: COOL_SHIRTZ_BASE_URL,
    logo: COOL_SHIRTZ_LOGO,
    getClothesFunction: getClothesCoolShirtz,
    getClotheInfoFunction: getClotheInfoCoolShirtz,
  },
  {
    id: 4001,
    name: 'Asos',
    baseUrl: ASOS_BASE_URL,
    logo: ASOS_LOGO,
    getClothesFunction: getClothesAsos,
    getClotheInfoFunction: getClotheInfoAsos,
  },
  {
    id: 4002,
    name: 'Culture Kings',
    baseUrl: CULTURE_KINGS_URL,
    logo: CULTURE_KINGS_LOGO,
    getClothesFunction: getClothesCultureKings,
    getClotheInfoFunction: getClotheInfoCultureKings,
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
