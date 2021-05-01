import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { FavouriteHeart } from '../favouriteHeart/FavouriteHeart';

export const CloseIcon = styled(FontAwesomeIcon)`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 400px;
  height: 100%;
`;

export const ThumbnailContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
`;

export const ThumbnailImage = styled.img<{ selected?: boolean }>`
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  border-right: ${(p) => p.selected && '8px solid #525050'};
`;

export const ImageContainer = styled.div<{ imageSrc?: string }>`
  width: 100%;
  background: top / contain no-repeat url(${(p) => p.imageSrc});
`;

export const TextContainer = styled.div`
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
  width: 100%;
  margin: 10px 0;
  top: 0;
`;

export const ViewButton = styled.button`
  cursor: pointer;
  flex: 1 1 auto;
`;

export const StyledFavouriteHeart = styled(FavouriteHeart)`
  justify-self: center;
  flex: 0 1 50px;
`;

export const Description = styled.div`
  grid-area: description;

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

  li {
    line-height: 1.2rem;
  }

  a {
    color: inherit;
  }
`;
