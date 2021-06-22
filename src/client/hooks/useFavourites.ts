import { useEffect, useState } from 'react';
import { ClotheItem } from '../../types/ClotheItem';
import { LocalStorageKey } from '../constants';
import { useWindow } from './useWindow';

interface ReturnProps {
  favourites: ClotheItem[];
  setFavourite: (selectedFavourite: ClotheItem) => void;
}

export const useFavourites = (): ReturnProps => {
  const window = useWindow();
  const [favourites, setFavouritesState] = useState<ClotheItem[]>([]);

  const setFavourite = (selectedFavourite: ClotheItem) => {
    let favs;
    if (favourites?.find((fav) => fav.link === selectedFavourite.link)) {
      favs = favourites.filter((fav) => fav.link !== selectedFavourite.link);
    } else {
      favs = favourites.concat(selectedFavourite);
    }

    setFavouritesState(favs);

    // save selected website changes to local storage
    window?.localStorage.setItem(
      LocalStorageKey.Favourites,
      JSON.stringify(favs)
    );
  };

  useEffect(() => {
    if (window) {
      const favourites = window.localStorage.getItem(
        LocalStorageKey.Favourites
      );
      if (favourites) setFavouritesState(JSON.parse(favourites));
    }
  }, [window]);

  return { favourites, setFavourite };
};
