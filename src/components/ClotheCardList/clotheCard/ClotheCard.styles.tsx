import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ZIndex } from '../../../styleConstants';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'ImageContainer'
    'InfoContainer';
`;

export const ImageContainer = styled.div`
  grid-area: ImageContainer;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
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

export const HeartIconContainer = styled.div<{ isRed: boolean }>`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  color: ${(props) => (props.isRed ? 'red' : props.theme.textColor)};
  position: absolute;
  z-index: ${ZIndex.pushContentForward};
  bottom: 5px;
  right: 5px;
  filter: drop-shadow(1px 1px 0px black);
`;

export const HeartIcon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
`;
