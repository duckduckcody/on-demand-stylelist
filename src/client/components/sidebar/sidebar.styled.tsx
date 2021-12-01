import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

export const SideBarContainer = styled.div`
  display: grid;
  background-color: ${(p) => p.theme.secondaryHeaderBackgroundColor};
  width: 275px;
  height: 100%;
`;

export const ItemsContainer = styled.div`
  display: grid;
  padding: 38px 0 0 46px;
  align-content: start;
  gap: 32px;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: center;
  height: 42px;
  cursor: pointer;

  &:hover {
    color: ${(p) => p.theme.sideBarSelected};
  }
`;

export const ItemIcon = styled.img<{ selected?: boolean }>`
  color: ${(p) => p.theme.sideBarSelected};
  height: 24px;
  width: 24px;
`;

export const SignInContainer = styled.div`
  height: 86px;
  width: 100%;
  justify-self: end;
  align-self: end;
  display: grid;
  align-items: center;
  background-color: ${(p) => p.theme.signInBackground};
  padding: 0 0 0 46px;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.signInBackgroundHightlight};
  }

  /* Once signed in set bg color to header color */
`;
