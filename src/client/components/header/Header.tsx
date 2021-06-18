import { ReactElement } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { DesktopHeader } from './DesktopHeader/DesktopHeader';
import { HeaderContainer, HeaderOffset } from './Header.styles';
import { MobileHeader } from './MobileHeader/MobileHeader';

export interface HeaderProps {
  pathName: string | undefined;
}

export const Header = ({ pathName }: HeaderProps): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <>
      <HeaderContainer>
        {!isMobile && <DesktopHeader pathName={pathName} />}
        {isMobile && <MobileHeader />}
      </HeaderContainer>
      <HeaderOffset />
    </>
  );
};
