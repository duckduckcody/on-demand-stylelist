import { useContext, useEffect } from 'react';
import { ClotheItem } from '../../types/ClotheItem';
import { LocalStorageKey } from '../constants';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { useWindow } from './useWindow';

interface ReturnProps {
  favourites: ClotheItem[] | undefined;
  setFavourite: (selectedFavourite: ClotheItem) => void;
}

export const useFavourites = (): ReturnProps => {
  const window = useWindow();
  const { favourites, setFavourites } = useContext(FavouritesContext);

  const setFavourite = (selectedFavourite: ClotheItem) => {
    if (favourites) {
      let favs;
      if (favourites?.some((fav) => fav.link === selectedFavourite.link)) {
        favs = favourites.filter((fav) => fav.link !== selectedFavourite.link);
      } else {
        favs = favourites.concat(selectedFavourite);
      }

      setFavourites(favs);

      window?.localStorage.setItem(
        LocalStorageKey.Favourites,
        JSON.stringify(favs)
      );
    }
  };

  useEffect(() => {
    if (window) {
      const favourites = window.localStorage.getItem(
        LocalStorageKey.Favourites
      );
      if (favourites) setFavourites(JSON.parse(favourites));
    }
  }, [setFavourites, window]);

  return { favourites, setFavourite };
};
