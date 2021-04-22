import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../constants';
import {
  HEADER_PRIMARY_HEIGHT,
  HEADER_SECONDARY_HEIGHT,
} from '../header/Header.styles';

export const CategoryTileListContainer = styled.div`
  margin: -12px -24px -12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr 1fr;
  height: calc(
    100vh - ${HEADER_PRIMARY_HEIGHT}px - ${HEADER_SECONDARY_HEIGHT}px
  );

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 200px;
    height: unset;
  }
`;

export const CategoryLink = styled.span`
  font-size: 1.25rem;
  color: ${(props) => props.theme.textColor};
`;
