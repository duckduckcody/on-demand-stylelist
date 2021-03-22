import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../util/absoluteUrl';
import { cacheRequest } from '../cacheRequest';
import { HEADERS } from '../constants';
import {
  clothesCache,
  ClothesResponseItem,
  GetClothesOptions,
} from '../getClothes';
import { coolShirtzCidMap, COOL_SHIRTZ_BASE_URL } from './constants';

export async function getClothesCoolShirtz(
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClothesResponseItem>[]> {
  const coolShirtzCid = coolShirtzCidMap.get(cid);
  if (!coolShirtzCid) return Promise.resolve([]);
  const clothes = await cacheRequest(
    requestHtml,
    clothesCache,
    `cool-shirtz-${coolShirtzCid!.uri}`,
    coolShirtzCid!.uri,
    requestOptions
  );
  return pageClothes(clothes, requestOptions);
}

const pageClothes = (
  clothes: Partial<ClothesResponseItem>[],
  requestOptions: GetClothesOptions
): Partial<ClothesResponseItem>[] => {
  if (!clothes) return [];
  const bottom = (requestOptions.page - 1) * requestOptions.limit;
  const top = bottom + requestOptions.limit;
  return clothes!.slice(bottom, top);
};

const requestHtml = async (uri: string): Promise<ClothesResponseItem[]> => {
  const response = await fetch(`${COOL_SHIRTZ_BASE_URL}/collections/${uri}`, {
    headers: HEADERS,
  });
  if (!response.ok) {
    response.json().then((err) => console.log('error', err));
  }

  const htmlString = await response.text();
  return scrapeHtml(htmlString);
};

const scrapeHtml = (htmlString: string): ClothesResponseItem[] => {
  const html = new JSDOM(htmlString);
  const collectedProducts: ClothesResponseItem[] = [];
  const products = html.window.document.getElementsByClassName(
    'prod-container'
  );
  for (const product of products) {
    //don't scrape sold out products
    if (product.getElementsByClassName('so icn')[0]) continue;

    const linkElement = product.getElementsByClassName('product-link')[0];
    const name = linkElement.getAttribute('title');
    const price = parsePrice(
      product.getElementsByClassName('money')[0].textContent || ''
    );
    const link = `${COOL_SHIRTZ_BASE_URL}${linkElement.getAttribute('href')}`;
    const image = absoluteUrl(
      product.getElementsByTagName('img')[0].getAttribute('data-src') || ''
    );

    if (!name || !price || !link || !image) {
      console.log('error scraping product');
      continue;
    }

    collectedProducts.push({
      name,
      price,
      link,
      image,
      website: 'Cool Shirtz',
    });
  }
  return collectedProducts;
};

const parsePrice = (priceString: string) =>
  parseFloat(priceString.replace('$', '').trim());
