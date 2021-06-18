import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../styleConstants';

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

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    &:hover {
      background-color: unset;
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;
