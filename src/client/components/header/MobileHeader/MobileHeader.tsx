import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Icon } from '../../Icon';
import { LogoText, MobileHeaderContainer } from './MobileHeader.styles';

interface Props {
  onSearchClick: VoidFunction;
}

export const MobileHeader = ({ onSearchClick }: Props): ReactElement => {
  return (
    <MobileHeaderContainer>
      <Icon icon={faBars} width={'1.25rem'} clickable />

      <Link href='/' passHref>
        <LogoText>STYLELIST</LogoText>
      </Link>

      <Icon
        icon={faSearch}
        width={'1.25rem'}
        clickable
        onClick={onSearchClick}
      />
    </MobileHeaderContainer>
  );
};
