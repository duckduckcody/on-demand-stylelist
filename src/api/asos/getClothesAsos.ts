import { Promise } from 'bluebird';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import { parsePrice } from '../../client/util/parsePrice';
import { recursiveGetClothes } from '../../client/util/recursiveGetClothes';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache } from '../cache';
import { HEADERS } from '../constants';
import {
  AsosCategory,
  ASOS_LIMIT,
  getAsosCategoryByCategoryId,
  makeAsosUrl,
  makeImageUrl,
} from './constants';

export async function getClothesAsos(
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> {
  const asosCategory = getAsosCategoryByCategoryId(parseInt(cid));
  if (!asosCategory) return Promise.resolve([]);

  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;

  const cacheKey = `asos-${asosCategory.uri}-${requestOptions.sort}`;
  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes<AsosCategory>(
    requestOptions,
    cachedClothes,
    asosCategory,
    requestData,
    ASOS_LIMIT,
    lastIndex
  );

  clothesCache.set(cacheKey, clothes);

  return clothes.slice(firstIndex, lastIndex);
}

const requestData = async (
  category: AsosCategory,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const response = await fetch(makeAsosUrl(category.uri, requestOptions), {
    headers: HEADERS,
  });
  if (!response.ok) {
    return response.text().then((res: unknown) => {
      console.log('asos err', res);
      return [{ error: res }];
    });
  }

  const htmlString = await response.text();
  return scrapeHtml(htmlString);
};

const scrapeHtml = (htmlString: string): ClotheItem[] => {
  const html = new JSDOM(htmlString);
  const collectedProducts: ClotheItem[] = [];
  const products = html.window.document.getElementsByTagName('article');
  for (const product of products) {
    const pElements = product.getElementsByTagName('p');
    const name = pElements[0].textContent;
    const price = parsePrice(
      pElements[1].getElementsByClassName('_16nzq18')[0]?.textContent
    );
    const discountedPrice = parsePrice(
      pElements[1].getElementsByClassName('_3VjzNxC')[0]?.textContent
    );
    const link = product
      .getElementsByTagName('a')[0]
      .getAttribute('href')
      ?.replace('www.', '');

    const id = product.getAttribute('id')?.replace('product-', '');
    const { image, fallbackImage } = makeImageUrl(id);

    if (!name || !price || !link || !image) {
      console.log('asos - error scraping product', {
        name,
        price,
        link,
        image,
      });
      continue;
    }

    collectedProducts.push({
      name,
      price,
      discountedPrice,
      link,
      image,
      fallbackImage,
      website: 'Asos',
    });
  }
  return collectedProducts;
};
