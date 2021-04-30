import { ASOS_BASE_URL, ASOS_LOGO } from './api/asos/constants';
import {
  COOL_SHIRTZ_BASE_URL,
  COOL_SHIRTZ_LOGO,
} from './api/coolShirtz/constants';
import {
  CULTURE_KINGS_LOGO,
  CULTURE_KINGS_URL,
} from './api/cultureKings/constants';

export interface BaseWebsite {
  id: number;
  name: string;
  baseUrl: string;
  logo?: string;
}

export enum WebsiteId {
  COOL_SHIRTZ = 4000,
  ASOS = 4001,
  CULTURE_KINGS = 4002,
}

export const baseWebsites: BaseWebsite[] = [
  {
    name: 'Cool Shirtz',
    id: WebsiteId.COOL_SHIRTZ,
    baseUrl: COOL_SHIRTZ_BASE_URL,
    logo: COOL_SHIRTZ_LOGO,
  },
  {
    name: 'Asos',
    id: WebsiteId.ASOS,
    baseUrl: ASOS_BASE_URL,
    logo: ASOS_LOGO,
  },
  {
    name: 'Culture Kings',
    id: WebsiteId.CULTURE_KINGS,
    baseUrl: CULTURE_KINGS_URL,
    logo: CULTURE_KINGS_LOGO,
  },
];

export const getWebsiteById = (id: WebsiteId): BaseWebsite => {
  const baseWebsite = baseWebsites.find((website) => website.id === id);
  if (!baseWebsite)
    throw new Error(
      `getWebsiteById - website not found with parameters id:${id}`
    );
  return baseWebsite;
};
