import styled from 'styled-components';
import { ZIndex } from '../../styleConstants';

export const HEADER_HEIGHT = 48;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${ZIndex.ui};
  height: ${HEADER_HEIGHT}px;
`;

export const HeaderOffset = styled.div`
  padding: ${HEADER_HEIGHT}px 0 0;
`;
