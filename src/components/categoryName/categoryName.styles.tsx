import styled from 'styled-components';

export const CategoryNameHeader = styled.div`
  margin: 0 0 21px;
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 1rem;
  justify-content: center;
`;

export const Item = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  flex: 0 0 250px;
  margin: 0 0 25px;
`;

export const ItemImageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

export const ItemImageLink = styled.a`
  width: 250px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  width: 250px;
  height: 80px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 0 0 24px;
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
