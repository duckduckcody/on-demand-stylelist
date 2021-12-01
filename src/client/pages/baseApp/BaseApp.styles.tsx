import { createGlobalStyle } from "styled-components";
import { HEADER_HEIGHT } from "../../components/header/Header.styles";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: 'Work Sans', sans-serif;
  }

  p {
    margin: 0;
  }
`;

export const ContentContainer = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;
