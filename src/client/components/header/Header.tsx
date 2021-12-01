import { ReactElement } from "react";
import { Header1 } from "../../styles";
import { HeaderContainer, HeaderOffset } from "./Header.styles";

export interface HeaderProps {
  pathName: string | undefined;
}

export const Header = ({ pathName }: HeaderProps): ReactElement => {
  return (
    <>
      <HeaderContainer>
        <Header1>STYLELIST</Header1>
      </HeaderContainer>
      <HeaderOffset />
    </>
  );
};
