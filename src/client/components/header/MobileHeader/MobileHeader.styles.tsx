import styled from 'styled-components';
import { Icon } from '../../Icon';

export const MobileHeaderContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

export const LogoText = styled.a`
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const HamburgerIcon = styled(Icon)`
  width: 20px;
`

export const Spacer = styled.i`
  width: 20px;
`
