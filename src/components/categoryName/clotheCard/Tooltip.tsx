import { ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: -10px;
`;

const TooltipContainer = styled.span`
  background-color: ${(p) => p.theme.textColor};
  color: ${(p) => p.theme.backgroundColor};
  padding: 5px 10px;
`;

const Arrow = styled.span`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid ${(p) => p.theme.textColor};
`;

interface Props {
  isFavourited: boolean;
}

export const Tooltip = ({ isFavourited }: Props): ReactElement => (
  <Container>
    <TooltipContainer>
      {isFavourited ? 'Unfavourite' : 'Favourite'}
    </TooltipContainer>
    <Arrow />
  </Container>
);
