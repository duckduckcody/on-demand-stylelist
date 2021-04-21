import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'ImageContainer'
    'InfoContainer';
`;

export const ImageContainer = styled.div<{ backgroundImage: string }>`
  grid-area: ImageContainer;
  background: center / cover no-repeat url(${(p) => p.backgroundImage});
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  grid-area: InfoContainer;
  overflow: hidden;
  display: grid;
  align-items: center;
  font-size: 1rem;
  line-height: 1.25rem;
  grid-template-rows: 1.25rem 1.25rem 2.5rem;
  align-items: center;
  grid-template-areas:
    'price'
    'websiteName'
    'clotheName';
`;

export const WebsiteName = styled.span`
  grid-area: websiteName;
`;

export const ClotheName = styled.span`
  grid-area: clotheName;
  align-self: start;
`;

export const Price = styled.span`
  grid-area: price;
`;

export const OldPrice = styled.span`
  text-decoration: line-through;
`;

export const HeartIconContainer = styled.div<{ isfavourited: boolean }>`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  color: ${(props) => (props.isfavourited ? 'red' : props.theme.textColor)};
  position: relative;
  left: calc(100% - 2rem - 10px);
  top: calc(100% - 2rem - 10px);
  filter: drop-shadow(1px 1px 0px black);

  &:hover {
    color: red;
  }
`;
