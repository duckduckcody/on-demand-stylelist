import { useCallback, useMemo, useState } from 'react';

interface ReturnProps {
  requestHasBeenMade: () => void;
  requestHasCompleted: () => void;
  requestProgressComplete: () => void;
  percentageOfRequestsCompleted: number;
}

export const usePromiseMapProgress = (): ReturnProps => {
  const [requestsCompleted, setRequestsCompleted] = useState(0);
  const [requestsMade, setRequestsMade] = useState(0);

  const requestHasBeenMade = useCallback(
    () => setRequestsMade((prevState) => prevState + 1),
    []
  );

  const requestHasCompleted = useCallback(
    () => setRequestsCompleted((prevState) => prevState + 1),
    []
  );

  const requestProgressComplete = useCallback(() => {
    setRequestsCompleted(0);
    setRequestsMade(0);
  }, []);

  const percentageOfRequestsCompleted = useMemo((): number => {
    if (requestsCompleted && requestsMade) {
      return Math.floor((requestsCompleted / requestsMade) * 100);
    }
    return 0;
  }, [requestsCompleted, requestsMade]);

  return {
    requestHasBeenMade,
    requestHasCompleted,
    requestProgressComplete,
    percentageOfRequestsCompleted,
  };
};
