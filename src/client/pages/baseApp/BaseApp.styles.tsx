import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { SIDEBAR_WIDTH } from "../../components/sidebar/sidebar.styled";

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

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: ${SIDEBAR_WIDTH}px 1fr;
`;
