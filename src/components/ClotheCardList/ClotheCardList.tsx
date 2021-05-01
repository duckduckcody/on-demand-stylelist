import { ReactElement } from 'react';
import { ClotheItem } from '../../api/getClothes';
import { ClotheCard } from './clotheCard/ClotheCard';
import { ClotheCardListContainer } from './ClotheCardList.styles';

interface Props {
  clothes: ClotheItem[];
  favourites: ClotheItem[] | undefined;
  onFavouriteClick: (clothe: ClotheItem) => void;
  className?: string;
}

export const ClotheCardList = ({
  clothes,
  favourites,
  onFavouriteClick,
  className,
}: Props): ReactElement => (
  <ClotheCardListContainer className={className}>
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
