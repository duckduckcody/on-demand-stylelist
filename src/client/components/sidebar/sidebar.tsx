import { FC, ReactNode } from "react";
import { Header2 } from "../../styles";
import {
  Container,
  Item,
  ItemIcon,
  ItemsContainer,
  SideBarContainer,
  SignInContainer,
} from "./sidebar.styled";

export interface SideBarProps {
  children: ReactNode;
}

export const SideBar: FC<SideBarProps> = ({ children }) => (
  <Container>
    <SideBarContainer>
      <ItemsContainer>
        <Item>
          <ItemIcon src="/home-icon.svg" alt="category" />
          <Header2>Home</Header2>
        </Item>
        <Item>
          <ItemIcon src="/category-icon.svg" alt="category" />
          <Header2>Categories</Header2>
        </Item>
        <Item>
          <ItemIcon src="/store-icon.svg" alt="category" />
          <Header2>Stores</Header2>
        </Item>
        <Item>
          <ItemIcon src="/heart-icon.svg" alt="category" />
          <Header2>Favourites</Header2>
        </Item>
      </ItemsContainer>
      <SignInContainer>
        <Header2>Sign in</Header2>
      </SignInContainer>
    </SideBarContainer>
    {children}
  </Container>
);
