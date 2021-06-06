import { ClotheItem } from '../../types/ClotheItem';
import { SearchClothesOptions } from '../../types/SearchClothesOptions';
import { searchFunction } from '../apiWebsites';
import { HEADERS } from '../constants';
import { pageClothes } from '../pageClothes';
import { makeCoolShirtzSearchUrl } from './constants';
import { scrapeSearchHtml } from './scrapers/scrapeSearchHtml';

export const searchCoolShirtz: searchFunction = async (
  query: string,
  requestOptions: SearchClothesOptions
): Promise<Partial<ClotheItem>[]> =>
  fetch(makeCoolShirtzSearchUrl(query, requestOptions), {
    headers: HEADERS,
  })
    .then((res) => res.text())
    .then((htmlString) => scrapeSearchHtml(htmlString))
    .then((clothes) => pageClothes(clothes, requestOptions));
