import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Gender } from '../../../../types/Gender';
import {
  HeaderContainer,
  HeaderLinkTitle,
  HeaderPageLink,
  Icon,
  LinkContainer,
  SearchContainer,
} from './DesktopHeader.styles';

interface Props {
  pathName: string | undefined;
  onSearchClick: VoidFunction;
}

export const DesktopHeader = ({
  pathName,
  onSearchClick,
}: Props): ReactElement => {
  const firstSlug = pathName?.split('/', 2)[1];

  return (
    <HeaderContainer>
      <LinkContainer>
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
        <Link href='/websites' passHref>
          <HeaderPageLink selected={pathName === '/websites'}>
            Websites
          </HeaderPageLink>
        </Link>
      </LinkContainer>

      {/* <SearchContainer onClick={onSearchClick}>
        <Icon icon={faSearch} />
      </SearchContainer> */}
    </HeaderContainer>
  );
};
