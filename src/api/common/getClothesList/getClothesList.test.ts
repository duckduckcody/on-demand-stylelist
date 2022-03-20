import { WebsiteId } from '../../../websites';
import { apiWebsites } from '../../apiWebsites';
import { coolShirtzCidMap } from '../../coolShirtz/constants';
import { getClothesList } from './getClothesList';

test('Cool Shirtz', async () => {
  const coolShirtzId = apiWebsites.find(
    (web) => web.id === WebsiteId.COOL_SHIRTZ
  )?.id;

  for (const key of coolShirtzCidMap.keys()) {
    const result = await getClothesList(`${key}`, `${coolShirtzId}`, {
      limit: 1,
      page: 1,
    });

    expect(result.length).toBe(1);
  }
});
