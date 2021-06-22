import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../../styleConstants';

export const ListClotheCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-auto-rows: 700px;
  gap: 2rem;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 1rem;
    grid-template-columns: 80%;
    grid-auto-rows: 70vh;
  } ;
`;
