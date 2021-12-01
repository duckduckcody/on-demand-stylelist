import Link from "next/link";
import { FC, ReactNode } from "react";
import { Header2 } from "../../styles";
import {
  Container,
  Item,
  ItemIcon,
  ItemsContainer,
  Itemtext,
  SideBarContainer,
  SignInContainer,
} from "./sidebar.styled";

export interface SideBarProps {
  children: ReactNode;
  pathName: string | undefined;
}

export const SideBar: FC<SideBarProps> = ({ children, pathName }) => (
  <Container>
    <SideBarContainer>
      <ItemsContainer>
        <Link href="/">
          <Item>
            <ItemIcon src="/home-icon.svg" alt="category" />
            <Itemtext selected={pathName === "/"}>Home</Itemtext>
          </Item>
        </Link>
        <Link href="/">
          <Item>
            <ItemIcon src="/category-icon.svg" alt="category" />
            <Itemtext>Categories</Itemtext>
          </Item>
        </Link>
        <Item>
          <ItemIcon src="/store-icon.svg" alt="category" />
          <Itemtext>Stores</Itemtext>
        </Item>
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
    {children}
  </Container>
);
