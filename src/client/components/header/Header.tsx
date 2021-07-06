import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { DesktopHeader } from './DesktopHeader/DesktopHeader';
import { HeaderContainer, HeaderOffset } from './Header.styles';
import { MobileHeader } from './MobileHeader/MobileHeader';
import { SearchHeader } from './SearchHeader/SearchHeader';

export interface HeaderProps {
  pathName: string | undefined;
}

export const Header = ({ pathName }: HeaderProps): ReactElement => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSearchClick = () => setIsSearching(true);

  const onSearch = () => {
    if (searchQuery) {
      setIsSearching(false);
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const onCancelSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <>
      <HeaderContainer>
        {isSearching && (
          <SearchHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={onSearch}
            onCancelSearch={onCancelSearch}
          />
        )}
        {!isSearching && !isMobile && (
          <DesktopHeader pathName={pathName} onSearchClick={onSearchClick} />
        )}
        {!isSearching && isMobile && (
          <MobileHeader onSearchClick={onSearchClick} />
        )}
      </HeaderContainer>
      <HeaderOffset />
    </>
  );
};
