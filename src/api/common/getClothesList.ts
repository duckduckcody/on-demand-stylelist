import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { Promise } from 'bluebird';
import { apiWebsites } from '../apiWebsites';

export const getClothesList = async (
  cid: string,
  selectedWebsite: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const website = apiWebsites.find(
    (website) => website.id === +selectedWebsite
  );
  if (!website || !website.getClothesFunction) return [];
  return website
    .getClothesFunction(cid, requestOptions)
    .catch((error: unknown) => Promise.reject(error));
};
