import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LocalStorageKey } from '../constants';
import { useWindow } from './useWindow';

interface ReturnProps {
  websites: string[];
  setWebsites: Dispatch<SetStateAction<string[]>>;
}

export const useSelectedWebsites = (): ReturnProps => {
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
