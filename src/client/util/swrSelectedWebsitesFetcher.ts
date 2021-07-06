import { Promise } from 'bluebird';
import flatten from 'lodash.flatten';

export interface FetcherError {
  message: string;
  status: number;
  id?: number;
}

export const swrSelectedWebsitesFetcher = async (
  url: string,
  selectedWebsites: string
): Promise<any> =>
  await Promise.map(JSON.parse(selectedWebsites), async (selectedWebsiteId) => {
    return await fetch(`${url}&selectedWebsite=${selectedWebsiteId}`)
      .then((res) => res.json())
      .catch(() => []);
  }).then((res) => flatten(res));
