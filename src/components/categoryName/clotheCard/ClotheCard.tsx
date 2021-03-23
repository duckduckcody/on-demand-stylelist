import { faHeart } from '@fortawesome/free-regular-svg-icons';
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
}

export const ClotheCard = ({ clothe }: Props): ReactElement => (
  <Container>
    <ImageContainer>
      {/* <ImageLink href={clothe.link} target='_blank' rel='noreferrer'> */}
      <Image src={clothe.image} />
      {/* </ImageLink> */}
    </ImageContainer>
    <WebsiteName>{clothe.website}</WebsiteName>
    <Price>${clothe.price}</Price>
    <ClotheName>{clothe.name}</ClotheName>
    <HeartIcon icon={faHeart} />
  </Container>
);
