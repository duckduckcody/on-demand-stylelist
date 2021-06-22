import styled from 'styled-components';
import { ZIndex } from '../../../styleConstants';
import { FavouriteHeart } from './favouriteHeart/FavouriteHeart';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'ImageContainer'
    'InfoContainer';
`;

export const ImageContainer = styled.div<{ imgSrc: string }>`
  grid-area: ImageContainer;
  position: relative;
  cursor: pointer;
  background: center / cover no-repeat url(${(p) => p.imgSrc});
`;

export const StyledFavouriteClothe = styled(FavouriteHeart)`
  position: absolute;
  z-index: ${ZIndex.pushContentForward};
  bottom: 5px;
  right: 5px;
`;

export const InfoContainer = styled.div`
  grid-area: InfoContainer;
  overflow: hidden;
  display: grid;
  align-items: center;
  font-size: 1rem;
  line-height: 1.25rem;
  grid-template-rows: 1.25rem 1.25rem 2.5rem;
  align-items: center;
  grid-template-areas:
    'price'
    'websiteName'
    'clotheName';
`;

export const WebsiteName = styled.span`
  grid-area: websiteName;
`;

export const ClotheName = styled.span`
  grid-area: clotheName;
  align-self: start;
`;

export const Price = styled.span`
  grid-area: price;
`;

export const OldPrice = styled.span`
  text-decoration: line-through;
`;
