import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../../../styleConstants';
import { FavouriteHeart } from '../favouriteHeart/FavouriteHeart';

export const CloseIcon = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  width: 32px;
  height: 32px;

  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 4px;
    background-color: white;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 400px;
  height: 100%;
  grid-template-areas: 'thumbnails image info';

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    grid-template-rows: 400px 1fr;
    grid-template-areas:
      'thumbnails'
      'info';
  }
`;

export const ThumbnailContainer = styled.div`
  grid-area: thumbnails;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
`;

export const ThumbnailImage = styled.img<{ selected?: boolean }>`
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  border-right: ${(p) => p.selected && `8px solid ${p.theme.hightlight}`};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 400px;
    width: 100%;
    border-right: none;
    cursor: unset;
  }
`;

export const ImageContainer = styled.div<{ imageSrc?: string }>`
  grid-area: image;
  width: 100%;
  background: top / contain no-repeat url(${(p) => p.imageSrc}),
    top / 200px no-repeat url('/loading-spinner.gif');
`;

export const TextContainer = styled.div`
  grid-area: info;
  position: relative;
  overflow-y: auto;
  display: grid;
  padding: 0 0 0 24px;
  grid-template-columns: 1fr 3rem;
  grid-template-rows: repeat(6, min-content);
  grid-template-areas:
    'websiteLogo websiteLogo'
    'price price'
    'websiteName websiteName'
    'name name'
    'buttonContainer buttonContainer'
    'description description';
`;

export const WebsitesLogo = styled.img`
  grid-area: websiteLogo;
  width: 150px;
`;

export const WebsiteName = styled.div`
  grid-area: websiteName;
  font-size: 1rem;
`;

export const Price = styled.div`
  grid-area: price;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Name = styled.div`
  grid-area: name;
  font-size: 1.5rem;
`;

export const ButtonContainer = styled.div`
  grid-area: buttonContainer;
  position: sticky;
  display: flex;
  flex-flow: row nowrap;
  justify-items: center;
  width: 100%;
  margin: 10px 0;
  top: 0;
`;

export const ViewButton = styled.button`
  cursor: pointer;
  flex: 1 1 auto;
`;

export const StyledFavouriteHeart = styled(FavouriteHeart)`
  flex: 0 1 2rem;
`;

export const Description = styled.div`
  grid-area: description;
  font-size: 1rem;
  line-height: 1.3rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 5px 0;
    font-size: 1.2rem;
  }

  ul,
  p {
    margin: 5px 0;
  }

  a {
    color: inherit;
  }
`;
