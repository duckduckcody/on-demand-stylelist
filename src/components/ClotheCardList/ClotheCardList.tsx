import { ReactElement } from 'react';
import { ClotheItem } from '../../api/getClothes';
import { ClotheCard } from './clotheCard/ClotheCard';
import { ClotheCardListContainer } from './ClotheCardList.styles';

interface Props {
  clothes: ClotheItem[];
  favourites: ClotheItem[] | undefined;
  onFavouriteClick: (clothe: ClotheItem) => void;
}

export const ClotheCardList = ({
  clothes,
  favourites,
  onFavouriteClick,
}: Props): ReactElement => (
  <ClotheCardListContainer>
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
  </ClotheCardListContainer>
);
