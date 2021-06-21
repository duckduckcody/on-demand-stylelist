import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const Icon = styled(FontAwesomeIcon)<{
  width?: string;
  margin?: string;
  clickable?: boolean;
}>`
  width: ${(p) => (p.width ? p.width : '1rem')};
  margin: ${(p) => (p.margin ? p.margin : '')};
  ${(p) => (p.clickable ? 'cursor: pointer;' : '')}
`;