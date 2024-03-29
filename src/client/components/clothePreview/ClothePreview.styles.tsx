import styled from "styled-components";
import { MOBILE_BREAKPOINT, ZIndex } from "../../styles";
import { FavouriteHeart } from "../List/ListClotheCards/clotheCard/favouriteHeart/FavouriteHeart";
import { RelatedProducts } from "./RelatedProducts/RelatedProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LoadingContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 700px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const Container = styled.div<{ hasRelatedProducts?: boolean }>`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 150px minmax(200px, 1000px) minmax(200px, 400px);
  grid-template-rows: ${(p) =>
    p.hasRelatedProducts ? `1fr max-content` : `100%`};
  grid-template-areas: ${(p) =>
    p.hasRelatedProducts
      ? `'thumbnails image info' 'relatedProducts relatedProducts relatedProducts'`
      : `'thumbnails image info'`};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    grid-template-rows: 40% 60%;
    grid-template-areas: "thumbnails" "info";
  }
`;

export const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  z-index: ${ZIndex.modal};
  filter: drop-shadow(1px 1px 0px black);
  font-size: 24px;
  width: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    right: 5px;
  }
`;

export const ThumbnailContainer = styled.div`
  grid-area: thumbnails;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-flow: column nowrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-flow: row nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
  }
`;

export const ThumbnailImage = styled.img<{
  selected?: boolean;
  isMobile?: boolean;
}>`
  cursor: ${(p) => (p.isMobile ? `grab` : `pointer`)};
  border-right: ${(p) => p.selected && `8px solid ${p.theme.highlight}`};
  width: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: unset;
    height: 100%;
  }
`;

export const ImageContainer = styled.div<{ imageSrc?: string }>`
  grid-area: image;
  background: top / contain no-repeat url(${(p) => p.imageSrc}),
    top / 200px no-repeat url("/loading-spinner.gif");
`;

export const TextContainer = styled.div<{ isMobile?: boolean }>`
  grid-area: info;
  overflow-y: auto;
  display: grid;
  padding: 0 0 0 12px;
  grid-template-columns: 1fr 36px;
  grid-template-rows: repeat(7, min-content);
  grid-template-areas:
    "websiteLogo websiteLogo"
    "price price"
    "websiteName websiteName"
    "name name"
    "buttonContainer favouriteHeart"
    "description description"
    ${(p) => (p.isMobile ? `'relatedProducts relatedProducts'` : "")};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
  }
`;

export const WebsitesLogo = styled.img`
  grid-area: websiteLogo;
  width: 150px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 5px 0 0;
  }
`;

export const WebsiteName = styled.div`
  grid-area: websiteName;
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const Price = styled.div`
  grid-area: price;
  font-size: 1.5rem;
  line-height: 2rem;
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
  padding: 5px 0;
  background-color: white;
  border: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 8px 0;
    font-size: 1.1rem;
  }
`;

export const StyledFavouriteHeart = styled(FavouriteHeart)`
  grid-area: favouriteHeart;
  margin: auto 0 auto 4px;
`;

export const Description = styled.div`
  grid-area: description;
  font-size: 1rem;
  line-height: 1.5rem;

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

export const StyledRelatedProducts = styled(RelatedProducts)`
  grid-area: relatedProducts;
`;
