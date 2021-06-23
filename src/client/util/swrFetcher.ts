export interface FetcherError {
  message: string;
  status: number;
  id: number;
}

export const swrFetcher = async <JSON = unknown>(
  url: string
): Promise<JSON> => {
  const res = await fetch(url);

  if (!res.ok) {
    const json = await res.json();
    const error: FetcherError = {
      message: json?.message ?? 'A server error has occurred',
      status: res.status,
      id: json?.id,
    };
    throw error;
  }

  return res.json();
};
