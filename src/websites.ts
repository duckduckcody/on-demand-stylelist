import {
  COOL_SHIRTZ_BASE_URL,
  COOL_SHIRTZ_LOGO,
} from './api/coolShirtz/constants';
import {
  CULTURE_KINGS_LOGO,
  CULTURE_KINGS_URL,
} from './api/cultureKings/constants';
import {
  UNIVERSAL_STORE_BASE_URL,
  UNIVERSAL_STORE_LOGO,
} from './api/universalStore/constants';

export interface Website {
  id: number;
  name: string;
  baseUrl: string;
  logo: string;
}

export enum WebsiteId {
  COOL_SHIRTZ = 4000,
  ASOS = 4001,
  CULTURE_KINGS = 4002,
  UNIVERSAL_STORE = 4003,
}

export const websites: Website[] = [
  {
    name: 'Cool Shirtz',
    id: WebsiteId.COOL_SHIRTZ,
    baseUrl: COOL_SHIRTZ_BASE_URL,
    logo: COOL_SHIRTZ_LOGO,
  },
  {
    name: 'Culture Kings',
    id: WebsiteId.CULTURE_KINGS,
    baseUrl: CULTURE_KINGS_URL,
    logo: CULTURE_KINGS_LOGO,
  },
  {
    name: 'Universal Store',
    id: WebsiteId.UNIVERSAL_STORE,
    baseUrl: UNIVERSAL_STORE_BASE_URL,
    logo: UNIVERSAL_STORE_LOGO,
  },
];

export const getWebsiteById = (id: WebsiteId): Website => {
  const baseWebsite = websites.find((website) => website.id === id);
  if (!baseWebsite)
    throw new Error(
      `getWebsiteById - website not found with parameters id:${id}`
    );
  return baseWebsite;
};
