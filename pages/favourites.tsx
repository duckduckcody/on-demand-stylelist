import { ReactElement, useEffect, useState } from 'react';
import { ClotheItem } from '../src/api/getClothes';
import { ListContainer } from '../src/components/categoryName/categoryName.styles';
import { ClotheCard } from '../src/components/categoryName/clotheCard/ClotheCard';
import { LocalStorageKey } from '../src/constants';

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
    <ListContainer>
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
    </ListContainer>
  );
}
