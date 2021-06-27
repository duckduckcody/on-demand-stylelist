export interface FetcherError {
  message: string;
  status: number;
  id?: number;
}

export const swrFetcher = async <JSON = unknown>(
  url: string
): Promise<JSON> => {
  const res = await fetch(url);

  if (!res.ok) {
    return res
      .text()
      .then((text) => {
        try {
          const json = JSON.parse(text);
          console.log('below parse');
          const error: FetcherError = {
            message: json?.message ?? 'A server error has occurred',
            status: res.status,
            id: json?.id,
          };
          return Promise.reject(error);
        } catch (e) {
          console.log('in catch');
          const error: FetcherError = {
            message: 'A server error has occurred',
            status: res.status,
          };
          return Promise.reject(error);
        }
      })
      .catch(() => {
        console.log('in promise catch');
        const error: FetcherError = {
          message: 'A server error has occurred',
          status: 500,
        };
        return Promise.reject(error);
      });
  }

  return res.json();
};
