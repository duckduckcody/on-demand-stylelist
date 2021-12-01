import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../styles";
import { HEADER_HEIGHT } from "../header/Header.styles";

export const CategoryTileListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr 1fr;
  height: calc(100vh - ${HEADER_HEIGHT}px);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 200px;
    height: unset;
  }
`;

export const CategoryLink = styled.span`
  font-size: 1.25rem;
  color: ${(props) => props.theme.textColor};
`;
