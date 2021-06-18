import { createGlobalStyle } from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../styleConstants';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    box-sizing: border-box;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      font-size: 14px;
    };
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: 'Martel Sans', sans-serif;
  }

  p {
    margin: 0;
  }
`;
