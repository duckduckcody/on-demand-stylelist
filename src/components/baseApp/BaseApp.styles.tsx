import styled, { createGlobalStyle } from 'styled-components';
import {
  HEADER_PRIMARY_HEIGHT,
  HEADER_SECONDARY_HEIGHT,
} from '../header/Header.styles';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: 'Martel Sans', sans-serif;
    font-size: 16px;
  }
`;

export const ContentContainer = styled.div<{
  preferredGender: boolean;
  isHome: boolean;
}>`
  margin: ${(props) =>
      props.preferredGender && !props.isHome
        ? HEADER_PRIMARY_HEIGHT + HEADER_SECONDARY_HEIGHT + 12
        : HEADER_PRIMARY_HEIGHT + 12}px
    24px 12px;
`;
