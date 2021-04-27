import styled from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  height: 100%;
`;

export const WebsitesLogo = styled.img`
  width: 200px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const ThumbnailContainer = styled.div`
  width: 150px;
  display: flex;
  flex-flow: column nowrap;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  cursor: pointer;
`;

export const ImageContainer = styled.div<{ imageSrc?: string }>`
  width: 100%;
  background: center / cover no-repeat url(${(p) => p.imageSrc});
`;

export const TextContainer = styled.div``;

export const ViewButton = styled.button`
  cursor: pointer;
  width: 300px;
  padding: 10px 0;
  margin: 20px 0;
`;
