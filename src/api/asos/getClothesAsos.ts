import { Promise } from 'bluebird';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import { parsePrice } from '../../util/parsePrice';
import { recursiveGetClothes } from '../../util/recursiveGetClothes';
import { HEADERS } from '../constants';
import { ClotheItem, clothesCache, GetClothesOptions } from '../getClothes';
import {
  asosCidMap,
  ASOS_LIMIT,
  makeAsosApiUrl,
  makeImageUrl,
} from './constants';

export async function getClothesAsos(
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> {
  const asosCid = asosCidMap.get(cid);
  if (!asosCid) Promise.resolve([]);

  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;

  const cacheKey = `asos-${asosCid!.uri}-${requestOptions.sort}`;
  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes(
    requestOptions,
    cachedClothes,
    asosCid!.uri,
    requestData,
    ASOS_LIMIT
  );

  clothesCache.set(cacheKey, clothes);

  return clothes.slice(firstIndex, lastIndex);
}

const requestData = async (
  uri: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const response = await fetch(makeAsosApiUrl(uri, requestOptions), {
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
    const price = parsePrice(pElements[1].textContent);
    const link = product.getElementsByTagName('a')[0].getAttribute('href');

    const id = product.getAttribute('id')?.replace('product-', '');
    const image = makeImageUrl(id);

    if (!name || !price || !link || !image) {
      console.log('asos - error scraping product', {
        name,
        price,
        link,
        image,
      });
      continue;
    }

    collectedProducts.push({ name, price, link, image, website: 'Asos' });
  }
  return collectedProducts;
};
