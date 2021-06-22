import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ListClotheCards } from '../src/client/components/List/ListClotheCards/ListClotheCards';
import { LocalStorageKey } from '../src/client/constants';
import { ClotheItem } from '../src/types/ClotheItem';

const NoFavouritesContainer = styled.div`
  margin: 24px 0 0;
  text-align: center;
`;

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
    <>
      {!favourites?.length && (
        <NoFavouritesContainer>
          <p>You have no favourites yet</p>
          <p>Click the Heart on products you like to save them here</p>
        </NoFavouritesContainer>
      )}
      {favourites && (
        <ListClotheCards
          clothes={favourites}
          favourites={favourites}
          onFavouriteClick={onFavouriteClick}
        />
      )}
    </>
  );
}
