import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0 24px;

  border-bottom: 1px solid #373737;
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
