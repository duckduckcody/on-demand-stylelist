import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const HeaderContainer = styled.div<{
  isSearching?: boolean;
}>`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: ${(p) => (p.isSearching ? `` : `0 24px;`)};
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

export const SearchContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Icon = styled(FontAwesomeIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const CloseSearchContainer = styled.div`
  color: #181818;
  position: absolute;
  cursor: pointer;
  right: calc(24px + 10px + 24px);
  bottom: calc(50% - (1.5rem / 2));
`;

const FloatingIcon = styled(FontAwesomeIcon)`
  color: #181818;
  position: absolute;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
`;

export const FloatingCloseIcon = styled(FloatingIcon)`
  right: calc(24px + 10px + 24px);
  bottom: calc(50% - (1.5rem / 2));
`;

export const FloatingSearchIcon = styled(FloatingIcon)`
  right: 24px;
  bottom: calc(50% - (1.5rem / 2));
`;
