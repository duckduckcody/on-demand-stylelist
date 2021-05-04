import Link from 'next/link';
import { ReactElement } from 'react';
import { Gender } from '../../../types/Gender';
import { Paths } from '../../constants';
import {
  HeaderContainer,
  HeaderLink,
  HeaderLinkContainer,
  HeaderLinkTitle,
  HeaderOffset,
  HeaderPageLink,
  PrimaryHeaderContainer,
  SecondaryHeaderContainer,
} from './Header.styles';

interface Props {
  pathName: string | undefined;
}

export const Header = ({ pathName }: Props): ReactElement => {
  const firstSlug = pathName?.split('/', 2)[1];
  const isShowingSecondaryHeader =
    firstSlug === Gender.MEN || firstSlug === Gender.WOMEN;
  const categoryPath = firstSlug === Gender.MEN ? Paths.mens : Paths.womens;
  const websitesPath =
    firstSlug === Gender.MEN ? Paths.mensWebsites : Paths.womensWebsites;

  return (
    <>
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
      <HeaderOffset isShowingSecondaryHeader={isShowingSecondaryHeader} />
    </>
  );
};
