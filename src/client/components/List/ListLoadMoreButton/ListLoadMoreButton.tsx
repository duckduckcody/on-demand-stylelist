import { ReactElement } from 'react';
import { ClotheItem } from '../../../../types/ClotheItem';
import { FetcherError } from '../../../util/swrFetcher';
import { ButtonContainer, LoadMoreButton } from './ListLoadMoreButton.styles';

interface Props {
  clothes: ClotheItem[];
  data: ClotheItem[][] | undefined;
  limit: number | undefined;
  size: number;
  setSize: (
    size: number | ((size: number) => number)
  ) => Promise<ClotheItem[][] | undefined>;
  error: FetcherError | undefined;
  isEmptyMessage?: string;
}

export const ListLoadMoreButton = ({
  clothes,
  data,
  limit,
  size,
  setSize,
  error,
  isEmptyMessage,
}: Props): ReactElement => {
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = !isLoadingInitialData && clothes.length === 0;
  const isEndOfData =
    data &&
    typeof limit !== 'undefined' &&
    data[data.length - 1]?.length < limit;

  return (
    <ButtonContainer>
      {error && error !== undefined && (
        <>
          <p>An error has occurred when fetching styles</p>
          <br />
          <p>
            (status: {error.status} message: {error.message})
          </p>
        </>
      )}

      {!error && (
        <>
          {!isLoadingMore &&
            isEndOfData &&
            (isEmpty
              ? isEmptyMessage
                ? isEmptyMessage
                : 'no styles found :('
              : 'no more styles :(')}

          {!isEndOfData && (
            <LoadMoreButton
              onClick={() => setSize(size + 1)}
              disabled={isLoadingMore}
            >
              {isLoadingMore &&
                (clothes.length === 0
                  ? 'Loading styles...'
                  : 'Loading more styles...')}
              {!isLoadingMore && !isEndOfData && 'Load more'}
            </LoadMoreButton>
          )}
        </>
      )}
    </ButtonContainer>
  );
};
