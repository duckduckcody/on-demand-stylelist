import { createContext, Dispatch, SetStateAction } from 'react';

export const IsShowingMobileHeaderDrawerContext = createContext<{
  isShowingMobileHeaderDrawer: boolean;
  setIsShowingMobileHeaderDrawer: Dispatch<SetStateAction<boolean>>;
}>({
  isShowingMobileHeaderDrawer: false,
  setIsShowingMobileHeaderDrawer: () => undefined,
});
