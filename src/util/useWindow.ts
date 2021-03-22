import { useMemo } from 'react';

export const useWindow = (): Window | undefined =>
  useMemo(() => (process.browser ? window : undefined), []);
