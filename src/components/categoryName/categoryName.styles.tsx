import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const CategoryNameHeader = styled.div`
  margin: 0 0 21px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
`;

export const LoadMoreButton = styled.button`
  display: flex;
  padding: 8px 24px;
  text-align: center;
  text-decoration: none;
  width: auto;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  color: rgb(72, 72, 72);
  border: 1px solid rgb(34, 34, 34);
  background-color: white;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: lightgrey;
  }

  &:active {
    background-color: grey;
  }
`;

export const SpinningFontAwesomeIcon = styled(FontAwesomeIcon)`
  animation: spinner 2s linear infinite;
  width: 24px;
  height: 24px;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
