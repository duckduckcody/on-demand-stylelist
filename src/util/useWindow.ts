import { useMemo } from 'react';

export const useWindow = () =>
  useMemo(() => (process.browser ? window : undefined), [process.browser]);
