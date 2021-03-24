import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from 'react';
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
}: Props): ReactElement => (
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
      isfavourited={isFavourited.toString()}
      icon={isFavourited ? faHeartSolid : faHeart}
      onClick={() => onFavouriteClick(clothe)}
    />
  </Container>
);
