import Link from "next/link";
import { FC } from "react";
import { Header2 } from "../../styles";
import {
  Container,
  Item,
  ItemIcon,
  ItemsContainer,
  Itemtext,
  Offset,
  SideBarContainer,
  SignInContainer,
} from "./sidebar.styled";

export interface SideBarProps {
  pathName: string | undefined;
}

export const SideBar: FC<SideBarProps> = ({ pathName }) => (
  <>
    <Container>
      <SideBarContainer>
        <ItemsContainer>
          <Link href="/">
            <Item>
              <ItemIcon src="/home-icon.svg" alt="category" />
              <Itemtext selected={pathName === "/"}>Home</Itemtext>
            </Item>
          </Link>
          <Link href="/mens">
            <Item>
              <ItemIcon src="/category-icon.svg" alt="category" />
              <Itemtext
                selected={
                  pathName?.includes("mens") || pathName?.includes("womens")
                }
              >
                Categories
              </Itemtext>
            </Item>
          </Link>
          <Link href="/stores">
            <Item>
              <ItemIcon src="/store-icon.svg" alt="category" />
              <Itemtext selected={pathName === "/stores"}>Stores</Itemtext>
            </Item>
          </Link>
          <Link href="/favourites">
            <Item>
              <ItemIcon src="/heart-icon.svg" alt="category" />
              <Itemtext selected={pathName === "/favourites"}>
                Favourites
              </Itemtext>
            </Item>
          </Link>
        </ItemsContainer>
        <SignInContainer>
          <Header2>Sign in</Header2>
        </SignInContainer>
      </SideBarContainer>
    </Container>
    <Offset />
  </>
);
