import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../../constants';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 3rem;
  grid-template-areas:
    'ImageContainer'
    'InfoContainer';
`;

export const ImageContainer = styled.div<{ backgroundImage: string }>`
  grid-area: ImageContainer;
  background: center / cover no-repeat url(${(p) => p.backgroundImage});
  height: 100%;
  width: 100%;
`;

export const InfoContainer = styled.div`
  grid-area: InfoContainer;
  display: grid;
  align-items: center;
  grid-template-rows: 1rem 1rem 1rem;
  grid-template-areas:
    'price price heartIcon heartIcon'
    'websiteName websiteName heartIcon heartIcon'
    'clotheName clotheName clotheName clotheName';

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-rows: 0.8rem 0.8rem 0.8rem;
    font-size: 0.8rem;
    grid-template-areas:
      'websiteName websiteName websiteName heartIcon'
      'price price price price'
      'clotheName clotheName clotheName clotheName';
  } ;
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

export const OldPrice = styled.span`
  text-decoration: line-through;
`;

export const HeartIconContainer = styled.span`
  grid-area: heartIcon;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const HeartIcon = styled(FontAwesomeIcon)<{ isfavourited: string }>`
  width: 100%;
  height: 100%;
  color: ${(props) =>
    props.isfavourited === 'true' ? 'red' : props.theme.textColor};

  &:hover {
    color: red;
  }
`;
