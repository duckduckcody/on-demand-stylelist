import { ReactElement, useState } from 'react';
import { ClotheItem } from '../../../../types/ClotheItem';
import {
  ClotheImage,
  ClotheName,
  Container,
  ImageContainer,
  InfoContainer,
  OldPrice,
  Price,
  StyledFavouriteClothe,
  WebsiteName,
} from './ClotheCard.styles';
import { ClothePreview } from './clothePreview/ClothePreview';

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(clothe.image);

  const handleImageContainerClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLDivElement;
    target.tagName === 'IMG' && setModalIsOpen(true);
  };

  const handleImageError = () =>
    clothe.fallbackImage && setImgSrc(clothe.fallbackImage);

  if (clothe.error) <></>;
  return (
    <Container id={clothe.link}>
      <ImageContainer onClick={(e) => handleImageContainerClick(e)}>
        <StyledFavouriteClothe
          clothe={clothe}
          isFavourited={isFavourited}
          onFavouriteClick={onFavouriteClick}
        />
        <ClotheImage
          loading='lazy'
          src={imgSrc}
          onError={handleImageError}
          alt=''
        />
      </ImageContainer>

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

      <ClothePreview
        isShowing={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        clothe={clothe}
        onFavouriteClick={onFavouriteClick}
        isFavourited={isFavourited}
      />
    </Container>
  );
};
