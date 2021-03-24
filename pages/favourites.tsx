import { ReactElement, useEffect, useState } from 'react';
import { ClothesResponseItem } from '../src/api/getClothes';
import { ListContainer } from '../src/components/categoryName/categoryName.styles';
import { ClotheCard } from '../src/components/categoryName/clotheCard/ClotheCard';
import { LOCAL_STORAGE_KEY_FAVOURITES } from '../src/constants';

export default function Favourites(): ReactElement {
  const [favourites, setFavourites] = useState<ClothesResponseItem[]>();

  useEffect(() => {
    if (window) {
      const favourites = window.localStorage.getItem(
        LOCAL_STORAGE_KEY_FAVOURITES
      );
      favourites && setFavourites(JSON.parse(favourites));
    }
  }, []);

  const onFavouriteClick = (clothe: ClothesResponseItem) => {
    if (window && favourites && clothe) {
      const buffer = favourites.filter((fav) => fav.link !== clothe.link);
      setFavourites(buffer);
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY_FAVOURITES,
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
