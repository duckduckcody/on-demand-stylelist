import styled from "styled-components";
import { MOBILE_BREAKPOINT, ZIndex } from "../../../styles";
import { HEADER_HEIGHT } from "../../header/Header.styles";

export const ContainerOffset = styled.div`
  margin: 0 0 48px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 0 0 64px 0;
  }
`;

export const Container = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  background: ${(p) => p.theme.backgroundColor};
  z-index: ${ZIndex.ui};
  padding: 12px 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 64px;
    padding: 8px;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-flow: column nowrap;
  }
`;

export const Option = styled.label`
  margin: 0 8px 0 0;

  &:last-child {
    margin: 0;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 0 0 4px 0;
  }
`;
