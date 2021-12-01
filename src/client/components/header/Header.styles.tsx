import styled from "styled-components";
import { ZIndex } from "../../styles";

export const HEADER_HEIGHT = 69;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${ZIndex.ui};
  height: ${HEADER_HEIGHT}px;
  background-color: ${(props) => props.theme.headerBackgroundColor};
  display: grid;
  align-items: center;
  padding: 0 0 0 46px;
`;

export const HeaderOffset = styled.div`
  padding: ${HEADER_HEIGHT}px 0 0;
`;
