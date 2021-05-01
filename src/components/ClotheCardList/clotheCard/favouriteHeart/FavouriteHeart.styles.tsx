import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const HeartIconContainer = styled.div<{ isRed: boolean }>`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  color: ${(props) => (props.isRed ? 'red' : props.theme.textColor)};
  filter: drop-shadow(1px 1px 0px black);
  display: flex;
  justify-content: center;
`;

export const HeartIcon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
`;
