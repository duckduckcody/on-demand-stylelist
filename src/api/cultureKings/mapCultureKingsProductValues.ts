import { ClotheItem } from '../../types/ClotheItem';
import { CultureKingsAlgoliaHits } from './algoliaIndex';
import { CULTURE_KINGS_URL } from './constants';

export const mapCultureKingsProductValues = (
  hits: Array<CultureKingsAlgoliaHits>
): ClotheItem[] =>
  hits.map((product) => ({
    name: product.title,
    discountedPrice: product.compareAtPrice ? product.price : undefined,
    price: product.compareAtPrice ? product.compareAtPrice : product.price,
    link: `${CULTURE_KINGS_URL}/products/${product.handle}?productId=${product.styleGroup}&gender=${product.gender}`,
    image: product.image,
    productId: product.styleGroup,
    website: 'Culture Kings',
  }));
