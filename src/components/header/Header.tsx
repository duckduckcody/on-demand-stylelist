import Link from 'next/link';
import { ReactElement } from 'react';
import { Gender, Paths } from '../../constants';
import {
  GenderHeaderLink,
  HeaderContainer,
  HeaderLink,
  HeaderLinkContainer,
  HeaderLinkTitle,
  PrimaryHeaderContainer,
  SecondaryHeaderContainer,
} from './Header.styles';

interface Props {
  isHome: boolean;
  preferredGender: Gender | undefined;
  pathName: string | undefined;
}

export const Header = ({
  isHome,
  preferredGender,
  pathName,
}: Props): ReactElement => {
  const isShowingSecondaryHeading = Boolean(preferredGender) && !isHome;
  const categoryPath =
    preferredGender === Gender.MEN ? Paths.mens : Paths.womens;

  return (
    <HeaderContainer>
      <PrimaryHeaderContainer
        isShowingSecondaryHeading={isShowingSecondaryHeading}
      >
        <HeaderLinkContainer>
          <Link href='/'>
            <HeaderLinkTitle>STYLELIST</HeaderLinkTitle>
          </Link>
          <Link href='/mens'>
            <GenderHeaderLink
              selected={preferredGender === Gender.MEN && !isHome}
            >
              Mens
            </GenderHeaderLink>
          </Link>
          <Link href='/womens'>
            <GenderHeaderLink
              selected={preferredGender === Gender.WOMEN && !isHome}
            >
              Womens
            </GenderHeaderLink>
          </Link>
          <Link href='/favourites' passHref>
            <HeaderLink>Favourites</HeaderLink>
          </Link>
        </HeaderLinkContainer>
      </PrimaryHeaderContainer>
      {isShowingSecondaryHeading && (
        <SecondaryHeaderContainer>
          <Link href={categoryPath}>
            <HeaderLink selected={pathName === categoryPath}>
              Categories
            </HeaderLink>
          </Link>
          <Link href={Paths.websites}>
            <HeaderLink selected={pathName === Paths.websites}>
              Websites
            </HeaderLink>
          </Link>
        </SecondaryHeaderContainer>
      )}
    </HeaderContainer>
  );
};
