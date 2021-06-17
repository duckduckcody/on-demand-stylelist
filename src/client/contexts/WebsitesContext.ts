import { createContext, Dispatch, SetStateAction } from 'react';

export const WebsitesContext = createContext<{
  websites: string[];
  setWebsites: Dispatch<SetStateAction<string[]>>;
  showingWebsitesConfig: boolean;
  setShowingWebsitesConfig: Dispatch<SetStateAction<boolean>>;
}>({
  websites: [],
  setWebsites: () => undefined,
  showingWebsitesConfig: false,
  setShowingWebsitesConfig: () => false,
});
