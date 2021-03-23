import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: 'Martel Sans', sans-serif;
    font-size: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: ${(props) => props.theme.headerBackgroundColor};
  padding: 12px 24px;
  border-bottom: 1px solid #373737;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const HeaderText = styled.h1`
  cursor: pointer;
  margin: 0 24px 0 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const HeaderLink = styled.span`
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const DarkModeIconContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  width: 1.5rem;
`;

export const ContentContainer = styled.div`
  margin: 12px 24px;
`;
