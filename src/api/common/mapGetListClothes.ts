import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { Promise } from 'bluebird';
import { apiWebsites } from '../apiWebsites';
import flatten from 'lodash.flatten';

export const mapGetListClothes = async (
  cid: string,
  selectedWebsites: string[],
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> =>
  await Promise.map(selectedWebsites, async (selectedWebsiteId) => {
    const website = apiWebsites.find(
      (website) => website.id === +selectedWebsiteId
    );
    if (!website || !website.getClothesFunction) return [];
    return website.getClothesFunction(cid, requestOptions);
  })
    .then((res) => flatten(res))
    .catch((error: unknown) => Promise.reject(error));
