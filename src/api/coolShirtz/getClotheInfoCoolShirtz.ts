import { ClotheInfo } from '../../types/ClotheInfo';
import { scrapeClotheInfoHtml } from './scrapers/scapeClotheInfoHtml';

export const getClotheInfoCoolShirtz = async (
  clotheUrl: URL
): Promise<ClotheInfo> => {
  return fetch(clotheUrl.href)
    .then((res) => res.text())
    .then((htmlString) => scrapeClotheInfoHtml(htmlString, clotheUrl.href))
    .catch((e) => Promise.reject(e));
};
