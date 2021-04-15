import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';

const SHOP_MENS_IMAGE_URL = '/shop_mens.webp';
const SHOP_WOMENS_IMAGE_URL = '/shop_womens.webp';

const Container = styled.div`
  margin: -12px -24px -12px;
  height: (100vh - 64px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const StyledImage = styled(Image)`
  z-index: -1;
`;

const ShopContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  height: calc(100vh - 64px);
  width: 50vw;

  &:hover ${StyledImage} {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    height: calc(50vh - 32px);
    width: 100vw;
  }
`;

export default function Home(): ReactElement {
  return (
    <Container>
      <Link href={`/mens`}>
        <ShopContainer>
          <StyledImage
            src={SHOP_MENS_IMAGE_URL}
            alt='Shop Mens'
            layout='fill'
            objectFit='cover'
            quality={100}
          />
          <span>SHOP WOMENS</span>
        </ShopContainer>
      </Link>
      <Link href={`/womens`}>
        <ShopContainer>
          <StyledImage
            src={SHOP_WOMENS_IMAGE_URL}
            alt='Shop Womens'
            layout='fill'
            objectFit='cover'
            quality={100}
          />
          <span>SHOP WOMENS</span>
        </ShopContainer>
      </Link>
    </Container>
  );
}
