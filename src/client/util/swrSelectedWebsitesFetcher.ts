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
    const res = await fetch(
      `${url}&selectedWebsites=[${JSON.stringify(selectedWebsiteId)}]`
    );
    return res.json();
  })
    .then((res) => flatten(res))
    .catch((error: unknown) => console.log('error', error));
