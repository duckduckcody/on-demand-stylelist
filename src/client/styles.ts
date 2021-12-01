import styled from "styled-components";

export const MOBILE_PX = 768;
export const MOBILE_BREAKPOINT = `${MOBILE_PX}px`;

export enum ZIndex {
  pushContentForward = 1,
  ui = 2,
  modal = 3,
}

export const Header1 = styled.span`
  font-family: "Work Sans", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.02em;
`;

export const Header2 = styled.span`
  font-family: "Work Sans", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.02em;
`;
