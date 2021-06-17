import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LocalStorageKey } from '../constants';
import { useWindow } from './useWindow';

export const useSelectedWebsites = (): {
  websites: string[];
  setWebsites: Dispatch<SetStateAction<string[]>>;
} => {
  const window = useWindow();
  const [websites, setWebsites] = useState<string[]>([]);

  useEffect(() => {
    if (window) {
      const websites = window.localStorage.getItem(LocalStorageKey.Websites);
      if (websites) setWebsites(JSON.parse(websites));
    }
  }, [window]);

  return { websites, setWebsites };
};
