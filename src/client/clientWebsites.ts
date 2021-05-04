import { uniqBy } from 'lodash';
import { getWebsiteById, Website, WebsiteId, websites } from '../websites';
import { coolShirtzDescriptionFormatter } from './util/descriptionFormatters/coolShirtzDescriptionFormatter';
import { cultureKingsDescriptionFormatter } from './util/descriptionFormatters/cultureKingsDescriptionFormatter';

export interface ClientWebsite extends Website {
  descriptionFormatter?: ((description: string) => string) | null;
}

export const clientWebsites: ClientWebsite[] = uniqBy(
  [
    {
      ...getWebsiteById(WebsiteId.CULTURE_KINGS),
      descriptionFormatter: cultureKingsDescriptionFormatter,
    },
    {
      ...getWebsiteById(WebsiteId.COOL_SHIRTZ),
      descriptionFormatter: coolShirtzDescriptionFormatter,
    },
    ...websites,
  ],
  'id'
);
