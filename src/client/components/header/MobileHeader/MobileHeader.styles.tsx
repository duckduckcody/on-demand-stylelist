import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

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

export const Icon = styled(FontAwesomeIcon)`
  font-size: 20px;
  width: 20px;
  cursor: pointer;
`;
