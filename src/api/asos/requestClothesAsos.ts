import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import { parsePrice } from '../../client/util/parsePrice';
import { recursiveGetClothes } from '../../client/util/recursiveGetClothes';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache } from '../cache';
import { HEADERS } from '../constants';
import { ASOS_LIMIT, makeImageUrl } from './constants';

export const requestClothesAsos = async (
  cacheKey: string,
  key: string,
  requestOptions: GetClothesOptions,
  makeUrlFunction: (key: string, requestOptions: GetClothesOptions) => string
): Promise<Partial<ClotheItem>[]> => {
  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;

  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes(
    cachedClothes,
    key,
    requestOptions,
    makeUrlFunction,
    requestData,
    ASOS_LIMIT,
    lastIndex
  );

  clothesCache.set(cacheKey, clothes);

  return clothes.slice(firstIndex, lastIndex);
};

const requestData = async (
  key: string,
  requestOptions: GetClothesOptions,
  makeUrlFunction: (key: string, requestOptions: GetClothesOptions) => string
): Promise<Partial<ClotheItem>[]> => {
  console.log(
    'makeUrlFunction(key, requestOptions)',
    makeUrlFunction(key, requestOptions)
  );

  const response = await fetch(makeUrlFunction(key, requestOptions), {
    headers: { ...HEADERS, Host: `www.asos.com` },
  });
  if (!response.ok) {
    return response.text().then((res: unknown) => {
      console.log('asos err', res);
      return [{ error: res }];
    });
  }

  console.log('ASOS RESPONSE OKAY');

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
