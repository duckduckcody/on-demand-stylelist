import styled from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ClotheInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  height: 100%;
`;

export const WebsitesLogo = styled.img`
  width: 20%;
`;

export const ClotheInfoImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

export const ClotheInfoThumbnailContainer = styled.div`
  flex: 0 1 10%;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
`;

export const ClotheInfoThumbnailImage = styled.img`
  width: 100%;
`;

export const ClotheInfoImage = styled.img`
  flex: 0 1 90%;
  width: 90%;
  height: 90%;
  object-fit: cover;
`;

export const ClotheInfoTextContainer = styled.div``;

export const ViewButton = styled.button`
  width: 100%;
  padding: 10px 0;
  margin: 20px 0;
`;
