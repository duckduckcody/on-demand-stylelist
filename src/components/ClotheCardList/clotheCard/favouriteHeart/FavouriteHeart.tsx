import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { ReactElement, useEffect, useState } from 'react';
import { ClotheItem } from '../../../../api/getClothes';
import { useIsMobile } from '../../../../util/useIsMobile';
import { Tooltip } from '../Tooltip';
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
    <Tippy
      content={<Tooltip isFavourited={isFavourited} />}
      delay={0}
      visible={isMobile ? false : iconHovered}
    >
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
    </Tippy>
  );
};
