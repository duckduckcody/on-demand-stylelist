import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const HEADER_PRIMARY_HEIGHT = 64;
export const HEADER_SECONDARY_HEIGHT = 32;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

export const PrimaryHeaderContainer = styled.div<{
  isShowingSecondaryHeading: boolean;
}>`
  height: ${HEADER_PRIMARY_HEIGHT}px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 12px 24px;
  background-color: ${(props) => props.theme.headerBackgroundColor};
  border-bottom: ${(props) =>
    props.isShowingSecondaryHeading ? 'none' : '1px solid #373737'};
`;

export const HeaderLinkContainer = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
`;

export const HeaderLink = styled.span<{ selected?: boolean }>`
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  margin: 0 12px 0 0;
  text-decoration: ${(p) => (p.selected ? 'underline' : 'none')};

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

  &:hover {
    text-decoration: none;
  }
`;

export const GenderHeaderLink = styled(HeaderLink)<{ selected?: boolean }>`
  height: 100%;
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.selected
      ? props.theme.secondaryHeaderBackgroundColor
      : 'transparent'};
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

export const SecondaryHeaderContainer = styled.div`
  height: ${HEADER_SECONDARY_HEIGHT}px;
  background-color: ${(props) => props.theme.secondaryHeaderBackgroundColor};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid #373737;
  box-sizing: border-box;
`;
