import styled from 'styled-components';

export const RelatedProductsSection = styled.div`
  margin: 24px 0 0;
  display: grid;
  grid-template-rows: min-content 1fr;
`;

export const RelatedProductsTitle = styled.p`
  font-size: 1.5rem;
`;

export const RelatedProductsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
`;

export const RelatedProduct = styled.div`
  flex: 0 0 150px;
`;

export const RelatedProductImage = styled.img`
  width: 100%;
  cursor: pointer;
`;
