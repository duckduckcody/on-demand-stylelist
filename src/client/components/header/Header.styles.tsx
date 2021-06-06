import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ZIndex } from '../../styleConstants';

export const HEADER_PRIMARY_HEIGHT = 48;
export const HEADER_SECONDARY_HEIGHT = 32;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${ZIndex.ui};
`;

export const HeaderOffset = styled.div<{ isShowingSecondaryHeader?: boolean }>`
  padding: ${(p) =>
      HEADER_PRIMARY_HEIGHT +
      (p.isShowingSecondaryHeader ? HEADER_SECONDARY_HEIGHT : 0)}px
    0 0;
`;

export const PrimaryHeaderContainer = styled.div<{
  isShowingSecondaryHeader?: boolean;
  isSearching?: boolean;
}>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  box-sizing: border-box;
  padding: ${(p) => (p.isSearching ? `` : `12px 24px;`)};
  height: ${HEADER_PRIMARY_HEIGHT}px;
  background-color: ${(props) => props.theme.headerBackgroundColor};
  border-bottom: ${(props) =>
    props.isShowingSecondaryHeader ? 'none' : '1px solid #373737'};
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  border: none;
  padding: 0 calc(5px + 1.5rem + 10px + 1.5rem + 24px) 0 24px;

  &::placeholder {
    color: rgba(55, 55, 55, 0.66);
  }

  &:focus {
    outline: none;
  }
`;

export const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const HeaderLink = styled.a<{ selected?: boolean }>`
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  margin: 0 12px 0 0;
  color: ${(props) => props.theme.textColor};
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

export const HeaderPageLink = styled(HeaderLink)<{ selected?: boolean }>`
  height: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.selected
      ? props.theme.secondaryHeaderBackgroundColor
      : 'transparent'};
`;

export const SearchContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  width: 1.5rem;
  height: 1.5rem;
`;

export const FloatingSearchContainer = styled(SearchContainer)`
  color: #181818;
  position: absolute;
  right: 24px;
  bottom: calc(1.5rem / 2);
`;

export const CloseSearchContainer = styled.div`
  color: #181818;
  position: absolute;
  cursor: pointer;
  right: calc(10px + 24px + 24px);
  bottom: calc(1.5rem / 2);
  width: 1.5rem;
  height: 1.5rem;
`;

export const Icon = styled(FontAwesomeIcon)`
  width: 1.5rem;
  height: 1.5rem;
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
