import { Promise } from 'bluebird';
import flatten from 'lodash.flatten';

export interface FetcherError {
  message: string;
  status: number;
  id?: number;
}

export const swrFetcher = async <JSON = unknown>(
  url: string,
  selectedWebsites: string
): Promise<any> => {
  // const res = await fetch(url);

  return await Promise.map(
    JSON.parse(selectedWebsites),
    async (selectedWebsiteId) => {
      const res = await fetch(
        `${url}&selectedWebsites=[${JSON.stringify(selectedWebsiteId)}]`
      );
      return res.json();
    }
  )
    .then((res) => flatten(res))
    .catch((error: unknown) => Promise.reject(error));

  // if (!res.ok) {
  //   return res.text().then((text) => {
  //     try {
  //       const json = JSON.parse(text);
  //       const error: FetcherError = {
  //         message: json?.message ?? 'A server error has occurred',
  //         status: res.status,
  //         id: json?.id,
  //       };
  //       return Promise.reject(error);
  //     } catch (e) {
  //       const error: FetcherError = {
  //         message: 'A server error has occurred',
  //         status: res.status,
  //       };
  //       return Promise.reject(error);
  //     }
  //   });
  // }

  // return res.json();
};
