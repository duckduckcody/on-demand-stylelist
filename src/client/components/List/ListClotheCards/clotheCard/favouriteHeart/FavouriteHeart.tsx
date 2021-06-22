import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import { ReactElement, useEffect, useState } from 'react';
import { ClotheItem } from '../../../../../../types/ClotheItem';
import { useIsMobile } from '../../../../../hooks/useIsMobile';
import { HeartIcon, HeartIconContainer } from './FavouriteHeart.styles';

interface Props {
  clothe: ClotheItem;
  onFavouriteClick?: (clothe: ClotheItem) => void;
  isFavourited?: boolean;
  className?: string;
}

export const FavouriteHeart = ({
  isFavourited = false,
  onFavouriteClick = () => null,
  clothe,
  className,
}: Props): ReactElement => {
  const isMobile = useIsMobile();
  const [iconHovered, setIconHovered] = useState(false);

  useEffect(() => {
    isMobile && setIconHovered(false);
  }, [isMobile]);

  return (
    <HeartIconContainer
      className={className}
      isRed={isFavourited || iconHovered}
    >
      <HeartIcon
        onMouseEnter={() => !isMobile && setIconHovered(true)}
        onMouseLeave={() => !isMobile && setIconHovered(false)}
        size={'4x'}
        icon={
          isFavourited
            ? iconHovered
              ? faHeartBroken
              : faHeartSolid
            : faHeartOutline
        }
        onClick={() => onFavouriteClick(clothe)}
      />
    </HeartIconContainer>
  );
};
