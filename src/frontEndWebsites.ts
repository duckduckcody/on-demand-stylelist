import { uniqBy } from 'lodash';
import {
  BaseWebsite,
  baseWebsites,
  getWebsiteById,
  WebsiteId,
} from './baseWebsites';
import { cultureKingsDescriptionFormatter } from './util/descriptionFormatters/cultureKingsDescriptionFormatter';

export interface FrontEndWebsites extends Partial<BaseWebsite> {
  descriptionFormatter?: ((description: string) => string) | null;
}

export const frontEndWebsites: FrontEndWebsites[] = uniqBy(
  [
    {
      ...getWebsiteById(WebsiteId.CULTURE_KINGS),
      descriptionFormatter: cultureKingsDescriptionFormatter,
    },
    ...baseWebsites,
  ],
  'id'
);
