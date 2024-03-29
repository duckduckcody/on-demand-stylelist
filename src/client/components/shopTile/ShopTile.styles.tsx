import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../styles";

export const Tile = styled.a<{ imageSrc: string }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  background: center / cover no-repeat url(${(p) => p.imageSrc});
  background-color: rgba(0, 0, 0, 0.3);
  background-blend-mode: darken;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.4);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;
