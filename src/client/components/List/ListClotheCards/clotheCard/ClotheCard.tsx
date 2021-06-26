import { ReactElement, useContext } from 'react';
import { ClotheItem } from '../../../../../types/ClotheItem';
import { ClothePreviewContext } from '../../../../contexts/ClothePreviewContext';
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

  const handleImageContainerClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLDivElement;
    if (target.tagName === 'DIV') {
      setClothePreviewUrl(clothe.link);
      setOptionalClotheInfo({ price: clothe.price });
    }
  };

  if (clothe.error) <></>;
  return (
    <Container id={clothe.link}>
      <ImageContainer onClick={handleImageContainerClick} imgSrc={clothe.image}>
        <StyledFavouriteClothe
          clothe={clothe}
          isFavourited={isFavourited}
          onFavouriteClick={onFavouriteClick}
        />
      </ImageContainer>

      <InfoContainer>
        <WebsiteName>{clothe.website}</WebsiteName>
        <Price>
          {clothe.oldPrice && (
            <>
              ${clothe.price} <OldPrice>${clothe.oldPrice}</OldPrice>{' '}
              {Math.trunc(
                ((clothe.price - clothe.oldPrice) / clothe.price) * 100
              )}
              % off
            </>
          )}
          {!clothe.oldPrice && `$${clothe.price}`}
        </Price>
        <ClotheName>{clothe.name}</ClotheName>
      </InfoContainer>
    </Container>
  );
};
