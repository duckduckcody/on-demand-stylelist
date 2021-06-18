import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LocalStorageKey } from '../constants';
import { useWindow } from './useWindow';

interface ReturnProps {
  selectedWebsites: string[];
  setSelectedWebsites: Dispatch<SetStateAction<string[]>>;
}

export const useSelectedWebsites = (): ReturnProps => {
  const window = useWindow();
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);

  useEffect(() => {
    if (window) {
      const websites = window.localStorage.getItem(LocalStorageKey.Websites);
      if (websites) setSelectedWebsites(JSON.parse(websites));
    }
  }, [window]);

  return { selectedWebsites, setSelectedWebsites };
};
