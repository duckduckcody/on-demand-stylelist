import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ReactElement, useContext } from 'react';
import { IsShowingMobileHeaderDrawerContext } from '../../../contexts/IsShowingMobileHeaderDrawerContext';
import { Icon } from '../../Icon';
import { LogoText, MobileHeaderContainer } from './MobileHeader.styles';

interface Props {
  onSearchClick: VoidFunction;
}

export const MobileHeader = ({ onSearchClick }: Props): ReactElement => {
  const { setIsShowingMobileHeaderDrawer } = useContext(
    IsShowingMobileHeaderDrawerContext
  );

  return (
    <MobileHeaderContainer>
      <Icon
        icon={faBars}
        width={'1.25rem'}
        clickable
        onClick={() => setIsShowingMobileHeaderDrawer(true)}
      />

      <Link href='/' passHref>
        <LogoText>STYLELIST</LogoText>
      </Link>

      <i></i>
      {/* <Icon
        icon={faSearch}
        width={'1.25rem'}
        clickable
        onClick={onSearchClick}
      /> */}
    </MobileHeaderContainer>
  );
};
