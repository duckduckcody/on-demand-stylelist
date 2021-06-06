import { useMemo } from 'react';
import { useWindow } from './useWindow';

export const useSelectedWebsites = (): string => {
  const window = useWindow();

  return useMemo((): string => {
    if (!window) return '[]';
    return window.localStorage.getItem('websites') ?? '[]';
  }, [window]);
};
