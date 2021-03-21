export interface FetcherError {
  message: string;
  status: number;
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const json = await res.json();
    const error: FetcherError = {
      message: json?.message,
      status: res.status,
    };
    throw error;
  }

  return res.json();
};
