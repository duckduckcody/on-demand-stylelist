import { createContext, Dispatch, SetStateAction } from 'react';
import { ClotheInfo } from '../types/ClotheInfo';

export const ClothePreviewContext = createContext<{
  clothePreviewUrl: string | undefined;
  setClothePreviewUrl: Dispatch<SetStateAction<string | undefined>>;
  optionalClotheInfo: Partial<ClotheInfo> | undefined;
  setOptionalClotheInfo: Dispatch<
    SetStateAction<Partial<ClotheInfo> | undefined>
  >;
}>({
  clothePreviewUrl: undefined,
  setClothePreviewUrl: () => undefined,
  optionalClotheInfo: undefined,
  setOptionalClotheInfo: () => undefined,
});
