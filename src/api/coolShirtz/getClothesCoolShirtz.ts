import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../client/util/absoluteUrl';
import { parsePrice } from '../../client/util/parsePrice';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache } from '../cache';
import { HEADERS } from '../constants';
import {
  coolShirtzCidMap,
  COOL_SHIRTZ_BASE_URL,
  makeCoolShirtzUrl,
} from './constants';

export async function getClothesCoolShirtz(
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> {
  const coolShirtzCid = coolShirtzCidMap.get(parseInt(cid));
  if (!coolShirtzCid) return Promise.resolve([]);

  const cacheKey = `cool-shirtz-${coolShirtzCid!.uri}-${requestOptions.sort}`;
  const cachedValue: Partial<ClotheItem>[] | undefined = clothesCache.get(
    cacheKey
  );
  if (cachedValue) return pageClothes(cachedValue, requestOptions);

  const clothes = await getClothes(coolShirtzCid!.uri, requestOptions);
  clothesCache.set(cacheKey, clothes);
  return pageClothes(clothes, requestOptions);
}

const pageClothes = (
  clothes: Partial<ClotheItem>[],
  requestOptions: GetClothesOptions
): Partial<ClotheItem>[] => {
  if (!clothes) return [];
  const bottom = (requestOptions.page - 1) * requestOptions.limit;
  const top = bottom + requestOptions.limit;
  return clothes!.slice(bottom, top);
};

const getClothes = async (uri: string, requestOptions: GetClothesOptions) => {
  const html = await getHtml(uri, requestOptions);
  return scrapeHtml(html);
};

const getHtml = async (
  uri: string,
  requestOptions: GetClothesOptions
): Promise<string> => {
  const response = await fetch(makeCoolShirtzUrl(uri, requestOptions), {
    headers: HEADERS,
  });
  if (!response.ok) {
    response.json().then((err) => console.log('error', err));
  }

  return await response.text();
};

const scrapeHtml = (htmlString: string): ClotheItem[] => {
  const html = new JSDOM(htmlString);
  const collectedProducts: ClotheItem[] = [];
  const products = html.window.document.getElementsByClassName(
    'prod-container'
  );
  for (const product of products) {
    //don't scrape sold out products
    if (product.getElementsByClassName('so icn')[0]) continue;

    const linkElement = product.getElementsByClassName('product-link')[0];
    const name = linkElement.getAttribute('title');

    const link = `${COOL_SHIRTZ_BASE_URL}${linkElement.getAttribute('href')}`;
    const image = absoluteUrl(
      product.getElementsByTagName('img')[0].getAttribute('data-src')
    );

    const moneyElements = product.getElementsByClassName('money');

    const discountedPrice = parsePrice(
      moneyElements.length === 1 ? undefined : moneyElements[0].textContent
    );

    const price = parsePrice(
      moneyElements.length === 1
        ? moneyElements[0].textContent
        : moneyElements[1].textContent
    );

    if (!name || !price || !link || !image) {
      console.log('cool shirtz - error scraping product', {
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
      website: 'Cool Shirtz',
    });
  }
  return collectedProducts;
};
