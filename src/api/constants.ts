import { ASOS_BASE_URL } from './asos/constants';
import { getClotheInfoAsos } from './asos/getClotheInfoAsos';
import { getClothesAsos } from './asos/getClothesAsos';
import { COOL_SHIRTZ_BASE_URL } from './coolShirtz/constants';
import { getClotheInfoCoolShirtz } from './coolShirtz/getClotheInfoCoolShirtz';
import { getClothesCoolShirtz } from './coolShirtz/getClothesCoolShirtz';
import { CULTURE_KINGS_URL } from './cultureKings/constants';
import { getClothesCultureKings } from './cultureKings/getClothesCultureKings';
import { ClotheInfo, ClotheItem, GetClothesOptions } from './getClothes';

export const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
};

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
