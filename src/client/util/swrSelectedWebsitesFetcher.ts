import { Promise } from 'bluebird';
import flatten from 'lodash.flatten';
import { ClotheItem } from '../../types/ClotheItem';

export interface FetcherError {
  message: string;
  status: number;
  id?: number;
}

export const swrSelectedWebsitesFetcher = async (
  url: string,
  selectedWebsites: string,
  requestHasBeenMade?: () => void,
  requestHasCompleted?: () => void
): Promise<ClotheItem[]> =>
  await Promise.map(JSON.parse(selectedWebsites), async (selectedWebsiteId) => {
    requestHasBeenMade?.();
    return await fetch(`${url}&selectedWebsite=${selectedWebsiteId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .catch(() => {
        console.log(`error fetching clothes (websiteId: ${selectedWebsiteId})`);
        return [];
      })
      .finally(() => requestHasCompleted?.());
  }).then((res) => flatten(res));
