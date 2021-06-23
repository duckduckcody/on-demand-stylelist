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
}

export const ListLoadMoreButton = ({
  clothes,
  data,
  limit,
  size,
  setSize,
  error,
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
      {!isLoadingMore &&
        isEndOfData &&
        (isEmpty ? 'no clothes found :(' : 'no more clothes :(')}

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
    </ButtonContainer>
  );
};