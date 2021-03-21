import { useMemo } from 'react';

export const useIsBrowser = () =>
  useMemo(() => process.browser, [process.browser]);
