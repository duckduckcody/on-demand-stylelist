import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { Promise } from 'bluebird';
import { apiWebsites } from '../apiWebsites';

export const searchClothesList = async (
  query: string,
  selectedWebsite: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const website = apiWebsites.find(
    (website) => website.id === +selectedWebsite
  );
  if (!website || !website.searchFunction) return [];
  return website
    .searchFunction(query, requestOptions)
    .catch((error: unknown) => Promise.reject(error));
};
