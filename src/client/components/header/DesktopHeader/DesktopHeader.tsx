import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Gender } from '../../../../types/Gender';
import { HeaderProps } from '../Header';
import {
  FloatingCloseIcon,
  FloatingSearchIcon,
  HeaderContainer,
  HeaderLinkTitle,
  HeaderPageLink,
  Icon,
  LinkContainer,
  SearchContainer,
  SearchInput,
} from './DesktopHeader.styles';

export const DesktopHeader = ({ pathName }: HeaderProps): ReactElement => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const firstSlug = pathName?.split('/', 2)[1];

  const search = () => {
    if (searchQuery) {
      setIsSearching(false);
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const cancelSearch = () => {
    setSearchQuery(undefined);
    setIsSearching(false);
  };

  return (
    <HeaderContainer isSearching={isSearching}>
      {isSearching && (
        <>
          <SearchInput
            autoFocus
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            placeholder='Search styles...'
          />
          <FloatingCloseIcon icon={faTimes} onClick={cancelSearch} />
          <FloatingSearchIcon icon={faSearch} onClick={search} />
        </>
      )}
      {!isSearching && (
        <>
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

          <SearchContainer onClick={() => setIsSearching(true)}>
            <Icon icon={faSearch} />
          </SearchContainer>
        </>
      )}
    </HeaderContainer>
  );
};
