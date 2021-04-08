import { Promise } from 'bluebird';
import fetch from 'node-fetch';
import { cacheRequest } from '../cacheRequest';
import { HEADERS } from '../constants';
import {
  ClotheItem,
  clothesCache,
  GetClothesOptions,
  makeClothesCacheKey,
} from '../getClothes';
import { AsosApiResponse, AsosProducts } from './AsosApiResponse';
import { asosCidMap, ASOS_BASE_URL, makeAsosApiUrl } from './constants';

export async function getClothesAsos(
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> {
  const asosCid = asosCidMap.get(cid);
  if (!asosCid) Promise.resolve([]);
  return cacheRequest(
    requestData,
    clothesCache,
    makeClothesCacheKey('asos', asosCid!.uri, requestOptions),
    asosCid!.uri,
    requestOptions
  );
}

const requestData = async (
  uri: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const response = await fetch(makeAsosApiUrl(uri, requestOptions), {
    headers: HEADERS,
  });
  if (!response.ok) {
    response.json().then((err: unknown) => console.log('error', err));
    Promise.resolve([]);
  }
  return response
    .json()
    .then(({ products }: AsosApiResponse) => mapProductValues(products));
};

const mapProductValues = (products: AsosProducts[]): ClotheItem[] => {
  return products.map((product) => ({
    name: product.name,
    price: product.price.current.value,
    link: `${ASOS_BASE_URL}/${product.url}`,
    image: `https://${product.imageUrl}`,
    website: 'Asos',
  }));
};
