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
  grid-template-columns: 1fr 400px;
  column-gap: 20px;
  height: 100%;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const ThumbnailContainer = styled.div`
  width: 150px;
  display: flex;
  flex-flow: column nowrap;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  cursor: pointer;
`;

export const ImageContainer = styled.div<{ imageSrc?: string }>`
  width: 100%;
  background: top / contain no-repeat url(${(p) => p.imageSrc});
`;

export const TextContainer = styled.div`
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 3rem;
  grid-template-rows: 100px 2rem 1rem 2rem min-content 2rem;
  grid-template-areas:
    'websiteLogo websiteLogo'
    'price price'
    'websiteName websiteName'
    'name name'
    'description description'
    'viewButton favouriteHeart';
`;

export const WebsitesLogo = styled.img`
  grid-area: websiteLogo;
  height: 100%;
`;

export const WebsiteName = styled.div`
  grid-area: websiteName;
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

export const Description = styled.div`
  grid-area: description;
`;

export const ViewButton = styled.button`
  grid-area: viewButton;
  cursor: pointer;
`;

export const StyledFavouriteHeart = styled(FavouriteHeart)`
  grid-area: favouriteHeart;
  justify-self: center;
`;
