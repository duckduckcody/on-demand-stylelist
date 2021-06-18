import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ZIndex } from '../../styleConstants';

export const HEADER_PRIMARY_HEIGHT = 48;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${ZIndex.ui};
`;

export const HeaderOffset = styled.div`
  padding: ${HEADER_PRIMARY_HEIGHT}px 0 0;
`;

export const PrimaryHeaderContainer = styled.div<{
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
  border-bottom: 1px solid #373737;
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

export const IconContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  & > div {
    margin: 0 10px 0 0;
  }

  & div:last-child {
    margin: 0;
  }
`;

export const WebsitesContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  width: 1.5rem;
  height: 1.5rem;
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
