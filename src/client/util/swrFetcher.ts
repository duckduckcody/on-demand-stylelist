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
    res
      .json()
      .then((json) => {
        console.log('inside json');
        console.log('res', res);
        const error: FetcherError = {
          message: json?.message ?? 'A server error has occurred',
          status: res.status,
          id: json?.id,
        };
        throw error;
      })
      .catch(() => {
        console.log('inside caught');
        console.log('res', res);
        const error: FetcherError = {
          message: 'A server error has occurred',
          status: res.status,
        };
        throw error;
      });
  }

  return res.json();
};
