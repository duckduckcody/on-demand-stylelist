import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';

const MENS_IMAGE =
  'https://culture-kings.imgix.net/collections/CKRTN_LK5.jpg?v=1617248817&auto=compress,format';

const WOMENS_IMAGE =
  'https://culture-kings.imgix.net/collections/image3.jpg?v=1614309442&auto=compress,format';

const Container = styled.div`
  margin: -12px -24px -12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const ImageContainer = styled.a`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  height: calc(100vh - 64px);

  &:hover {
    background-blend-mode: darken;
  }
`;

const ShopMensContainer = styled(ImageContainer)`
  background: center / cover no-repeat rgba(0, 0, 0, 0.5) url(${MENS_IMAGE});
`;

const ShopWomensContainer = styled(ImageContainer)`
  background: center / cover no-repeat rgba(0, 0, 0, 0.5) url(${WOMENS_IMAGE});
`;

export default function Home(): ReactElement {
  return (
    <Container>
      <Link href={`/mens`}>
        <ShopMensContainer>
          <span>SHOP MENS</span>
        </ShopMensContainer>
      </Link>
      <Link href={`/womens`}>
        <ShopWomensContainer>
          <span>SHOP WOMENS</span>
        </ShopWomensContainer>
      </Link>
    </Container>
  );
}
