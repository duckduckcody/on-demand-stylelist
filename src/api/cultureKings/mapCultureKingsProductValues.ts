import { ClotheItem } from '../../types/ClotheItem';
import { CultureKingsAlgoliaHits } from './algoliaIndex';
import { CULTURE_KINGS_URL } from './constants';

export const mapCultureKingsProductValues = (
  hits: Array<CultureKingsAlgoliaHits>
): ClotheItem[] =>
  hits.map((product) => ({
    name: product.title,
    oldPrice: product.compareAtPrice > 0 ? product.compareAtPrice : undefined,
    price: product.price,
    link: `${CULTURE_KINGS_URL}/products/${product.handle}?productId=${product.styleGroup}&gender=${product.gender}`,
    image: product.image,
    productId: product.styleGroup,
    website: 'Culture Kings',
  }));
