import styled, { createGlobalStyle } from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../constants';
import {
  HEADER_PRIMARY_HEIGHT,
  HEADER_SECONDARY_HEIGHT,
} from '../header/Header.styles';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      font-size: 14px;
    } ;
  }

  body {
    margin: 0;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: 'Martel Sans', sans-serif;
  }
`;

export const ContentContainer = styled.div<{
  isShowingSecondaryHeader: boolean;
}>`
  margin: ${(props) =>
      props.isShowingSecondaryHeader
        ? HEADER_PRIMARY_HEIGHT + HEADER_SECONDARY_HEIGHT + 12
        : HEADER_PRIMARY_HEIGHT + 12}px
    24px 12px;
`;
