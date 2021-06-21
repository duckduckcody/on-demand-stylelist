import { ReactElement, useContext } from 'react';
import { ClotheItem } from '../../../../types/ClotheItem';
import { ClothePreviewContext } from '../../../contexts/ClothePreviewContext';
import {
  ClotheName,
  Container,
  ImageContainer,
  InfoContainer,
  OldPrice,
  Price,
  StyledFavouriteClothe,
  WebsiteName,
} from './ClotheCard.styles';

interface Props {
  clothe: ClotheItem;
  onFavouriteClick?: (clothe: ClotheItem) => void;
  isFavourited?: boolean;
}

export const ClotheCard = ({
  clothe,
  isFavourited = false,
  onFavouriteClick = () => null,
}: Props): ReactElement => {
  const { setClothePreviewUrl, setOptionalClotheInfo } =
    useContext(ClothePreviewContext);

  const handleImageContainerClick = () => {
    setClothePreviewUrl(clothe.link);
    setOptionalClotheInfo({ price: clothe.price });
  };

  if (clothe.error) <></>;
  return (
    <Container id={clothe.link}>
      <StyledFavouriteClothe
        clothe={clothe}
        isFavourited={isFavourited}
        onFavouriteClick={onFavouriteClick}
      />

      <ImageContainer
        onClick={handleImageContainerClick}
        imgSrc={clothe.image}
      ></ImageContainer>

      <InfoContainer>
        <WebsiteName>{clothe.website}</WebsiteName>
        <Price>
          {clothe.discountedPrice && (
            <>
              ${clothe.discountedPrice} <OldPrice>${clothe.price}</OldPrice>{' '}
              {Math.trunc(
                ((clothe.price - clothe.discountedPrice) / clothe.price) * 100
              )}
              % off
            </>
          )}
          {!clothe.discountedPrice && `$${clothe.price}`}
        </Price>
        <ClotheName>{clothe.name}</ClotheName>
      </InfoContainer>
    </Container>
  );
};
