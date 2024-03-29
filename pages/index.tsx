import { ReactElement } from "react";
import styled from "styled-components";
import { HEADER_HEIGHT } from "../src/client/components/header/Header.styles";
import { ShopTile } from "../src/client/components/shopTile/ShopTile";
import { Paths } from "../src/client/constants";
import { MOBILE_BREAKPOINT } from "../src/client/styles";

const SHOP_MENS_IMAGE_URL = "/shop_mens.webp";
const SHOP_WOMENS_IMAGE_URL = "/shop_womens.webp";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: calc(100vh - ${HEADER_HEIGHT}px);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const StyledShopTile = styled(ShopTile)`
  font-size: 2.5rem;
  color: ${(props) => props.theme.textColor};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 1.5rem;
  }
`;

export default function Home(): ReactElement {
  return (
    <Container>
      <StyledShopTile link={Paths.mens} imageSrc={SHOP_MENS_IMAGE_URL}>
        <span>SHOP MENS</span>
      </StyledShopTile>
      <StyledShopTile link={Paths.womens} imageSrc={SHOP_WOMENS_IMAGE_URL}>
        <span>SHOP WOMENS</span>
      </StyledShopTile>
    </Container>
  );
}
