import { createGlobalStyle } from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../constants';

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
