import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { ReactElement, useState } from 'react';
import { ClotheItem } from '../../../api/getClothes';
import {
  ClotheName,
  Container,
  HeartIcon,
  HeartIconContainer,
  Image,
  ImageContainer,
  Price,
  WebsiteName,
} from './ClotheCard.styles';
import { Tooltip } from './Tooltip';

interface Props {
  clothe: ClotheItem;
  isFavourited?: boolean;
  onFavouriteClick: (clothe: ClotheItem) => void;
}

export const ClotheCard = ({
  clothe,
  isFavourited = false,
  onFavouriteClick,
}: Props): ReactElement => {
  const [iconHovered, setIconHovered] = useState(false);

  return (
    <Container>
      <ImageContainer>
        <a href={clothe.link} target='_blank' rel='noreferrer'>
          <Image src={clothe.image} />
        </a>
      </ImageContainer>
      <WebsiteName>{clothe.website}</WebsiteName>
      <Price>${clothe.price}</Price>
      <ClotheName>{clothe.name}</ClotheName>

      <Tippy
        content={<Tooltip isFavourited={isFavourited} />}
        delay={0}
        visible={iconHovered}
      >
        <HeartIconContainer tabIndex={0}>
          <HeartIcon
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
            isfavourited={isFavourited.toString()}
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
    </Container>
  );
};
