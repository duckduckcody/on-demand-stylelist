import styled from 'styled-components';

export const CategoryNameHeader = styled.div`
  margin: 0 0 21px;
  display: flex;
  justify-content: space-between;
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 2rem;
  justify-items: center;
  align-items: start;
  justify-content: center;
  align-content: start;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
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
