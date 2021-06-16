import useSWR from 'swr';
import { ClotheInfo } from '../../../types/ClotheInfo';
import { FetcherError, swrFetcher } from '../../util/swrFetcher';

interface fetchedClotheInfo {
  clotheInfo: ClotheInfo | undefined;
  isLoading: boolean;
  isError: FetcherError | undefined;
}

export const useClotheInfo = (url: string | undefined): fetchedClotheInfo => {
  const { data, error } = useSWR<ClotheInfo, FetcherError>(
    url ? `/api/getClotheInfo?clotheLink=${encodeURIComponent(url)}` : null,
    swrFetcher,
    { revalidateOnFocus: false }
  );

  return {
    clotheInfo: data,
    isLoading: !data && !error,
    isError: !data ? error : undefined,
  };
};
