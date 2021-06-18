import { createContext, Dispatch, SetStateAction } from 'react';

export const SelectedWebsitesContext = createContext<{
  selectedWebsites: string[];
  setSelectedWebsites: Dispatch<SetStateAction<string[]>>;
}>({
  selectedWebsites: [],
  setSelectedWebsites: () => undefined,
});
