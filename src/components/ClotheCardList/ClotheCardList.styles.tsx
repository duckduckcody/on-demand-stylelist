import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../constants';

export const ClotheCardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-auto-rows: 400px;
  gap: 2rem;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 300px;
  } ;
`;
