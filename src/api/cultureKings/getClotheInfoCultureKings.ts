import { ClotheInfo } from '../../types/ClotheInfo';
import { WebsiteId } from '../../websites';
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
      filters: `gender:${gender} AND styleGroup:YGroup_${productId}`,
      hitsPerPage: 1,
      headers: CULTURE_KINGS_ALGOLIA_HEADERS,
    })
    .then(({ hits }) => ({
      link: clotheUrl.href,
      name: hits[0].title,
      price: hits[0].price,
      description: hits[0].description,
      websitesLogo: CULTURE_KINGS_LOGO,
      websiteName: 'Culture Kings',
      websiteId: WebsiteId.CULTURE_KINGS,
      images: hits[0].images.map((image) => ({
        image: image,
        thumbnail: image.replace('.jpg', `_x${THUMBNAIL_WIDTH}.jpg`),
      })),
    }))
    .catch((e) => Promise.reject(e));
};
