import styled from 'styled-components';
import { MOBILE_BREAKPOINT, ZIndex } from '../../../styleConstants';

export const ErrorContainer = styled.div`
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 24px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 24px;
  }
`;

export const LoadMoreButton = styled.button`
  display: flex;
  padding: 8px 24px;
  justify-content: center;
  text-decoration: none;
  width: 333px;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  color: rgb(72, 72, 72);
  border: none;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: lightgrey;
  }

  &:active {
    background-color: grey;
  }

  &:disabled {
    background-color: lightgrey;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const LoadingProgress = styled.div<{
  percentageOfRequestsCompleted: number | undefined;
}>`
  position: absolute;
  top: 0;
  left: 0;
  background: ${(p) => p.theme.highlight};
  height: 100%;
  border-radius: 8px;
  transition: width 0.25s ease;
  width: ${(p) =>
    `${
      !p.percentageOfRequestsCompleted ? 0 : p.percentageOfRequestsCompleted
    }%`};
`;

export const LoadingText = styled.span`
  z-index: ${ZIndex.pushContentForward};
`;
