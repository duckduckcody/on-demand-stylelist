import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const Icon = styled(FontAwesomeIcon)<{
  margin?: string;
  clickable?: boolean;
}>`
  margin: ${(p) => (p.margin ? p.margin : '')};
  ${(p) => (p.clickable ? 'cursor: pointer;' : '')}
`;
