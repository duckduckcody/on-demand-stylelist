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

export const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: ${(props) => props.theme.headerBackgroundColor};
  padding: 12px 24px;
  border-bottom: 1px solid #373737;
  height: 64px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

export const HeaderLinkContainer = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
`;

export const HeaderLink = styled.span`
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  margin: 0 12px 0 0;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    margin: 0;
  }
`;

export const HeaderLinkTitle = styled(HeaderLink)`
  margin: 0 24px 0 0;
  font-size: 2rem;
  font-weight: 700;
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
  margin: 76px 24px 12px;
`;
