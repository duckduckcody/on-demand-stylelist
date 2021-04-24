import Link from 'next/link';
import { ReactElement, useContext } from 'react';
import { Gender, Paths } from '../../constants';
import { PreferredGenderContext } from '../baseApp/BaseApp';
import {
  HeaderContainer,
  HeaderLink,
  HeaderLinkContainer,
  HeaderLinkTitle,
  HeaderPageLink,
  PrimaryHeaderContainer,
  SecondaryHeaderContainer,
} from './Header.styles';

interface Props {
  firstSlug: string | undefined;
  pathName: string | undefined;
  isShowingSecondaryHeader: boolean | undefined;
}

export const Header = ({
  firstSlug,
  pathName,
  isShowingSecondaryHeader,
}: Props): ReactElement => {
  const { preferredGender } = useContext(PreferredGenderContext);
  const categoryPath =
    preferredGender === Gender.MEN ? Paths.mens : Paths.womens;
  const websitesPath =
    preferredGender === Gender.MEN ? Paths.mensWebsites : Paths.womensWebsites;

  return (
    <HeaderContainer>
      <PrimaryHeaderContainer
        isShowingSecondaryHeader={isShowingSecondaryHeader}
      >
        <HeaderLinkContainer>
          <Link href='/' passHref>
            <HeaderLinkTitle>STYLELIST</HeaderLinkTitle>
          </Link>
          <Link href='/mens' passHref>
            <HeaderPageLink selected={firstSlug === Gender.MEN}>
              Mens
            </HeaderPageLink>
          </Link>
          <Link href='/womens' passHref>
            <HeaderPageLink selected={firstSlug === Gender.WOMEN}>
              Womens
            </HeaderPageLink>
          </Link>
          <Link href='/favourites' passHref>
            <HeaderPageLink selected={pathName === '/favourites'}>
              Favourites
            </HeaderPageLink>
          </Link>
        </HeaderLinkContainer>
      </PrimaryHeaderContainer>
      {isShowingSecondaryHeader && (
        <SecondaryHeaderContainer>
          <Link href={categoryPath} passHref>
            <HeaderLink selected={pathName === categoryPath}>
              Categories
            </HeaderLink>
          </Link>
          <Link href={websitesPath} passHref>
            <HeaderLink selected={pathName === websitesPath}>
              Websites
            </HeaderLink>
          </Link>
        </SecondaryHeaderContainer>
      )}
    </HeaderContainer>
  );
};
