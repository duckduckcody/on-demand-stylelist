import { useMemo } from 'react';

export const useIsBrowser = (): boolean => useMemo(() => process.browser, []);
