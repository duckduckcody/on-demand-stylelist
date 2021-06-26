import { ClotheInfo } from '../../types/ClotheInfo';
import { scrapeClotheInfoUniversalStore } from './scrapers/scrapeClotheInfoUniversalStore';

export const getClotheInfoUniversalStore = async (
  clotheUrl: URL
): Promise<ClotheInfo> => {
  return fetch(clotheUrl.href)
    .then((res) => res.text())
    .then((htmlString) =>
      scrapeClotheInfoUniversalStore(htmlString, clotheUrl.href)
    )
    .catch((e) => Promise.reject(e));
};
