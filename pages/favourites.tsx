import { ReactElement, useEffect, useState } from 'react';
import { ClotheCard } from '../src/client/components/ClotheCardList/clotheCard/ClotheCard';
import { ClotheCardListContainer } from '../src/client/components/ClotheCardList/ClotheCardList.styles';
import { LocalStorageKey } from '../src/client/constants';
import { ClotheItem } from '../src/types/ClotheItem';

export default function Favourites(): ReactElement {
  const [favourites, setFavourites] = useState<ClotheItem[]>();

  useEffect(() => {
    if (window) {
      const favourites = window.localStorage.getItem(
        LocalStorageKey.Favourites
      );
      favourites && setFavourites(JSON.parse(favourites));
    }
  }, []);

  const onFavouriteClick = (clothe: ClotheItem) => {
    if (window && favourites && clothe) {
      const buffer = favourites.filter((fav) => fav.link !== clothe.link);
      setFavourites(buffer);
      window.localStorage.setItem(
        LocalStorageKey.Favourites,
        JSON.stringify(buffer)
      );
    }
  };

  return (
    <ClotheCardListContainer>
      {!favourites?.length && <p>No favourites found</p>}
      {favourites &&
        favourites.map((fav) => (
          <ClotheCard
            key={fav.link}
            clothe={fav}
            isFavourited={true}
            onFavouriteClick={onFavouriteClick}
          />
        ))}
    </ClotheCardListContainer>
  );
}
