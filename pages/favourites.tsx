import { ReactElement } from 'react';
import styled from 'styled-components';
import { ListClotheCards } from '../src/client/components/List/ListClotheCards/ListClotheCards';
import { useFavourites } from '../src/client/hooks/useFavourites';

const NoFavouritesContainer = styled.div`
  margin: 24px 0 0;
  text-align: center;
`;

export default function Favourites(): ReactElement {
  const { favourites, setFavourite } = useFavourites();

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
          onFavouriteClick={setFavourite}
        />
      )}
    </>
  );
}
