export interface FetcherError {
  message: string;
  id: number;
  status: number;
}

export const swrFetcher = async <JSON = unknown>(
  url: string
): Promise<JSON> => {
  const res = await fetch(url);

  if (!res.ok) {
    const json = await res.json();
    const error: FetcherError = {
      message: json?.message,
      status: res.status,
      id: json?.id,
    };
    throw error;
  }

  return res.json();
};
