import Link from 'next/link';
import { ReactElement, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { IsShowingMobileHeaderDrawerContext } from '../../../../contexts/IsShowingMobileHeaderDrawerContext';
import { ZIndex } from '../../../../styleConstants';
import {
  Container,
  LinkText,
  StyledLogoText,
} from './MobileHeaderDrawer.styles';

export const MobileHeaderDrawer = ({
  pathName,
}: {
  pathName: string | undefined;
}): ReactElement => {
  const firstSlug = pathName?.split('/', 2)[1];
  const { isShowingMobileHeaderDrawer, setIsShowingMobileHeaderDrawer } =
    useContext(IsShowingMobileHeaderDrawerContext);

  useEffect(() => {
    if (isShowingMobileHeaderDrawer) document.body.style.overflow = 'hidden';
    if (!isShowingMobileHeaderDrawer) document.body.style.overflow = 'unset';
  }, [isShowingMobileHeaderDrawer]);

  const close = () => setIsShowingMobileHeaderDrawer(false);

  return (
    <Modal
      style={{
        overlay: {
          zIndex: ZIndex.modal,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          zIndex: ZIndex.modal,
          color: 'white',
          backgroundColor: '#181818',
          border: 'none',
          padding: 0,
          left: 0,
          top: 0,
          bottom: 0,
          width: '250px',
        },
      }}
      isOpen={isShowingMobileHeaderDrawer}
      onRequestClose={close}
    >
      <Container>
        <Link href='/' passHref>
          <StyledLogoText onClick={close}>STYLELIST</StyledLogoText>
        </Link>
        <Link href='/mens' passHref>
          <LinkText onClick={close} selected={firstSlug === 'mens'}>
            Mens
          </LinkText>
        </Link>
        <Link href='/womens' passHref>
          <LinkText onClick={close} selected={firstSlug === 'womens'}>
            Womens
          </LinkText>
        </Link>
        <Link href='/favourites' passHref>
          <LinkText onClick={close} selected={firstSlug === 'favourites'}>
            Favourites
          </LinkText>
        </Link>
        <Link href='/websites' passHref>
          <LinkText onClick={close} selected={firstSlug === 'websites'}>
            Websites
          </LinkText>
        </Link>
      </Container>
    </Modal>
  );
};
