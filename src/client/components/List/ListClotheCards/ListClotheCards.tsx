import { ReactElement } from 'react';
import { ClotheItem } from '../../../../types/ClotheItem';
import { ClotheCard } from './clotheCard/ClotheCard';
import { ListClotheCardsContainer } from './ListClotheCards.styles';

interface Props {
  clothes: ClotheItem[] | undefined;
  favourites: ClotheItem[] | undefined;
  onFavouriteClick: (clothe: ClotheItem) => void;
  className?: string;
}

export const ListClotheCards = ({
  clothes,
  favourites,
  onFavouriteClick,
  className,
}: Props): ReactElement => (
  <ListClotheCardsContainer className={className}>
    {clothes &&
      clothes.map((clothe) => (
        <ClotheCard
          key={clothe.link}
          clothe={clothe}
          isFavourited={
            favourites && favourites.some((fav) => fav.link === clothe.link)
          }
          onFavouriteClick={onFavouriteClick}
        />
      ))}
  </ListClotheCardsContainer>
);
