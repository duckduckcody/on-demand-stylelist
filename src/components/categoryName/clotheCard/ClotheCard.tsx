import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import { ReactElement, useState } from 'react';
import { ClothesResponseItem } from '../../../api/getClothes';
import {
  ClotheName,
  Container,
  HeartIcon,
  Image,
  ImageContainer,
  Price,
  WebsiteName,
} from './ClotheCard.styles';

interface Props {
  clothe: ClothesResponseItem;
  isFavourited?: boolean;
  onFavouriteClick: (clothe: ClothesResponseItem) => void;
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
    </Container>
  );
};
