import { ClotheInfo } from '../../types/ClotheInfo';
import { THUMBNAIL_WIDTH } from '../constants';
import {
  clotheInfoCultureKingsAlgoliaIndex,
  CultureKingsAlgoliaHits,
  CULTURE_KINGS_ALGOLIA_HEADERS,
} from './algoliaIndex';
import { CULTURE_KINGS_LOGO } from './constants';

export const getClotheInfoCultureKings = async (
  clotheUrl: URL
): Promise<ClotheInfo> => {
  const productId = clotheUrl.searchParams.get('productId');
  const gender = clotheUrl.searchParams.get('gender');
  return clotheInfoCultureKingsAlgoliaIndex
    .search<CultureKingsAlgoliaHits>('', {
      filters: `gender:${gender} AND openstyleStyleCode:${productId}`,
      hitsPerPage: 1,
      headers: CULTURE_KINGS_ALGOLIA_HEADERS,
    })
    .then(({ hits }) => ({
      description: hits[0].description,
      websitesLogo: CULTURE_KINGS_LOGO,
      images: hits[0].images.map((image) => ({
        image: image,
        thumbnail: image.replace('.jpg', `_x${THUMBNAIL_WIDTH}.jpg`),
      })),
    }));
};
