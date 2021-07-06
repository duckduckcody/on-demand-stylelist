import { createContext, Dispatch, SetStateAction } from 'react';
import { ClotheItem } from '../../types/ClotheItem';

export const FavouritesContext = createContext<{
  favourites: ClotheItem[] | undefined;
  setFavourites: Dispatch<SetStateAction<ClotheItem[] | undefined>>;
}>({
  favourites: undefined,
  setFavourites: () => undefined,
});
