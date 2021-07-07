import {
  COOL_SHIRTZ_BASE_URL,
  COOL_SHIRTZ_FAVICON,
  COOL_SHIRTZ_LOGO,
} from './api/coolShirtz/constants';
import {
  CULTURE_KINGS_FAVICON,
  CULTURE_KINGS_LOGO,
  CULTURE_KINGS_URL,
} from './api/cultureKings/constants';
import {
  UNIVERSAL_STORE_BASE_URL,
  UNIVERSAL_STORE_FAVICON,
  UNIVERSAL_STORE_LOGO,
} from './api/universalStore/constants';

export interface Website {
  id: number;
  name: string;
  baseUrl: string;
  logo: string;
  favicon: string;
  description: string;
  tags: string[];
}

export enum WebsiteId {
  COOL_SHIRTZ = 4000,
  CULTURE_KINGS = 4002,
  UNIVERSAL_STORE = 4003,
}

export const websites: Website[] = [
  {
    name: 'Cool Shirtz',
    id: WebsiteId.COOL_SHIRTZ,
    baseUrl: COOL_SHIRTZ_BASE_URL,
    logo: COOL_SHIRTZ_LOGO,
    favicon: COOL_SHIRTZ_FAVICON,
    description: `Cool Internet influenced clothes for Cool People!`,
    tags: [`E-Boy`, `E-Girl`, `Internet Culture`],
  },
  {
    name: 'Culture Kings',
    id: WebsiteId.CULTURE_KINGS,
    baseUrl: CULTURE_KINGS_URL,
    logo: CULTURE_KINGS_LOGO,
    favicon: CULTURE_KINGS_FAVICON,
    description: `Culture Kings stands at the forefront of a worldwide streetwear phenomenon, showcasing a unique blend of music, sport and fashion found across the globe.`,
    tags: [`Streetwear`, `Music`, `Sport`],
  },
  {
    name: 'Universal Store',
    id: WebsiteId.UNIVERSAL_STORE,
    baseUrl: UNIVERSAL_STORE_BASE_URL,
    logo: UNIVERSAL_STORE_LOGO,
    favicon: UNIVERSAL_STORE_FAVICON,
    description: `Universal Store is a leading Australian retailer specialising in trend-led, casual men’s and women’s fashion.`,
    tags: [`Casual`, `Trends`, `Wide Range`],
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
