import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from 'react';
import { ClotheItem } from '../../../../types/ClotheItem';
import { FetcherError } from '../../../util/swrFetcher';
import {
  ButtonContainer,
  ErrorContainer,
  LoadingProgress,
  LoadingText,
  LoadMoreButton,
  SpinnerIcon,
} from './ListLoadMoreButton.styles';

interface Props {
  clothes: ClotheItem[];
  data: ClotheItem[][] | undefined;
  limit: number | undefined;
  size: number;
  setSize: (
    size: number | ((size: number) => number)
  ) => Promise<ClotheItem[][] | undefined>;
  error: FetcherError | undefined;
  percentageOfRequestsCompleted?: number;
  isEmptyMessage?: string;
}

export const ListLoadMoreButton = ({
  clothes,
  data,
  limit,
  size,
  setSize,
  error,
  percentageOfRequestsCompleted,
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
        <ErrorContainer>
          An error has occurred when fetching styles.
          <br />
          This request will be automatically retried.
          <br />
          Please try a different category or websites if this message persists.
          <br />
          (status: {error.status} message: {error.message})
        </ErrorContainer>
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
              {isLoadingMore && (
                <>
                  <LoadingProgress
                    percentageOfRequestsCompleted={
                      percentageOfRequestsCompleted
                    }
                  ></LoadingProgress>
                  <LoadingText>
                    {percentageOfRequestsCompleted
                      ? `${percentageOfRequestsCompleted}% of styles fetched`
                      : `Fetching styles`}
                  </LoadingText>
                  <SpinnerIcon icon={faSpinner} />
                </>
              )}
              {!isLoadingMore && !isEndOfData && 'Load more'}
            </LoadMoreButton>
          )}
        </>
      )}
    </ButtonContainer>
  );
};
