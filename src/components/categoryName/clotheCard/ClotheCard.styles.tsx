import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 400px;
  display: grid;
  grid-template-rows: 300px 1fr 1fr 1fr;
  grid-template-areas:
    'image image image image'
    'price price heartIcon heartIcon'
    'websiteName websiteName heartIcon heartIcon'
    'clotheName clotheName clotheName clotheName';
`;

export const ImageContainer = styled.div`
  grid-area: image;
  place-self: center;
`;

export const Image = styled.img`
  height: 300px;
`;

export const WebsiteName = styled.span`
  grid-area: websiteName;
  place-self: center start;
`;

export const ClotheName = styled.span`
  grid-area: clotheName;
  place-self: start start;
`;

export const Price = styled.span`
  grid-area: price;
  place-self: end start;
`;

export const HeartIcon = styled(FontAwesomeIcon)<{ isfavourited: string }>`
  grid-area: heartIcon;
  width: 1.5rem;
  place-self: center end;
  cursor: pointer;
  color: ${(props) => (props.isfavourited === 'true' ? 'red' : 'white')};
`;
