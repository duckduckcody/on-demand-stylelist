import { uniqBy } from 'lodash';
import {
  BaseWebsite,
  baseWebsites,
  getBaseWebsiteById,
  WebsiteId,
} from './baseWebsites';
import { cultureKingsDescriptionFormatter } from './util/descriptionFormatters/cultureKingsDescriptionFormatter';

export interface FrontEndWebsites extends BaseWebsite {
  descriptionFormatter?: ((description: string) => string) | null;
}

export const frontEndWebsites: FrontEndWebsites[] = uniqBy(
  [
    {
      ...getBaseWebsiteById(WebsiteId.CULTURE_KINGS),
      descriptionFormatter: cultureKingsDescriptionFormatter,
    },
    ...baseWebsites,
  ],
  'id'
);
