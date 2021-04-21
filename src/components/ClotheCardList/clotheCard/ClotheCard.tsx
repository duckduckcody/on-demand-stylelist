import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { ReactElement, useState } from 'react';
import { ClotheItem } from '../../../api/getClothes';
import {
  ClotheName,
  Container,
  HeartIconContainer,
  ImageContainer,
  InfoContainer,
  OldPrice,
  Price,
  WebsiteName,
} from './ClotheCard.styles';
import { Tooltip } from './Tooltip';

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
  const [iconHovered, setIconHovered] = useState(false);

  if (clothe.error) <></>;

  return (
    <Container>
      <ImageContainer backgroundImage={clothe.image}>
        <a href={clothe.link} target='_blank' rel='noreferrer'></a>
        <Tippy
          content={<Tooltip isFavourited={isFavourited} />}
          delay={0}
          visible={iconHovered}
        >
          <HeartIconContainer isfavourited={isFavourited}>
            <FontAwesomeIcon
              onMouseEnter={() => setIconHovered(true)}
              onMouseLeave={() => setIconHovered(false)}
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
    </Container>
  );
};
