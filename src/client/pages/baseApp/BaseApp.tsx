import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import { ClotheInfo } from '../../../types/ClotheInfo';
import { ClotheItem } from '../../../types/ClotheItem';
import { ClothePreview } from '../../components/clothePreview/ClothePreview';
import { Header } from '../../components/header/Header';
import { MobileHeaderDrawer } from '../../components/header/MobileHeader/MobileHeaderDrawer/MobileHeaderDrawer';
import { ClothePreviewContext } from '../../contexts/ClothePreviewContext';
import { FavouritesContext } from '../../contexts/FavouritesContext';
import { IsShowingMobileHeaderDrawerContext } from '../../contexts/IsShowingMobileHeaderDrawerContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useWindow } from '../../hooks/useWindow';
import { darkTheme } from '../../themes';
import { GlobalStyle } from './BaseApp.styles';
import { Favicon } from './Favicon';
import { GoogleFonts } from './GoogleFonts';

export const BaseApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const window = useWindow();
  const isMobile = useIsMobile();
  const [favourites, setFavourites] = useState<ClotheItem[] | undefined>();
  const [pathName, setPathName] = useState<string | undefined>();
  const [isShowingMobileHeaderDrawer, setIsShowingMobileHeaderDrawer] =
    useState(false);
  const [optionalClotheInfo, setOptionalClotheInfo] = useState<
    Partial<ClotheInfo> | undefined
  >(undefined);
  const [clothePreviewUrl, setClothePreviewUrl] = useState<string | undefined>(
    undefined
  );

  useEffect(() => Modal.setAppElement('#appElement'), []);

  useEffect(() => {
    if (!isMobile) setIsShowingMobileHeaderDrawer(false);
  }, [isMobile]);

  useEffect(() => {
    setPathName(window?.location.pathname);
  }, [window?.location.pathname]);

  return (
    <main id='appElement'>
      <Head>
        <title>Stylelist</title>
        <GoogleFonts query='family=Martel+Sans:wght@300;400;700&display=swap' />
        <Favicon favicon='📜' />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <ClothePreviewContext.Provider
          value={{
            setClothePreviewUrl,
            clothePreviewUrl,
            optionalClotheInfo,
            setOptionalClotheInfo,
          }}
        >
          <IsShowingMobileHeaderDrawerContext.Provider
            value={{
              isShowingMobileHeaderDrawer,
              setIsShowingMobileHeaderDrawer,
            }}
          >
            <FavouritesContext.Provider value={{ favourites, setFavourites }}>
              <GlobalStyle />
              <Header pathName={pathName}></Header>
              <Component {...pageProps} />
              <ClothePreview />
              <MobileHeaderDrawer pathName={pathName} />
            </FavouritesContext.Provider>
          </IsShowingMobileHeaderDrawerContext.Provider>
        </ClothePreviewContext.Provider>
      </ThemeProvider>
    </main>
  );
};
