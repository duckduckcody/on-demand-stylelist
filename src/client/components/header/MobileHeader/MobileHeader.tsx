import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ReactElement, useContext } from 'react';
import { IsShowingMobileHeaderDrawerContext } from '../../../contexts/IsShowingMobileHeaderDrawerContext';
import { LogoText, MobileHeaderContainer, Spacer, HamburgerIcon } from './MobileHeader.styles';

interface Props {
  onSearchClick: VoidFunction;
}

export const MobileHeader = ({ onSearchClick }: Props): ReactElement => {
  const { setIsShowingMobileHeaderDrawer } = useContext(
    IsShowingMobileHeaderDrawerContext
  );

  return (
    <MobileHeaderContainer>
      <HamburgerIcon
        icon={faBars}
        clickable
        onClick={() => setIsShowingMobileHeaderDrawer(true)}
      />

      <Link href='/' passHref>
        <LogoText>STYLELIST</LogoText>
      </Link>

      <Spacer></Spacer>
      {/* <Icon
        icon={faSearch}
        width={'1.25rem'}
        clickable
        onClick={onSearchClick}
      /> */}
    </MobileHeaderContainer>
  );
};
