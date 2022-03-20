import { WebsiteId } from '../../../websites';
import { apiWebsites } from '../../apiWebsites';
import { coolShirtzCidMap } from '../../coolShirtz/constants';
import { cultureKingsCidMap } from '../../cultureKings/constants';
import { getClothesList } from './getClothesList';

jest.setTimeout(22000);

test('Cool Shirtz', async () => {
  const id = apiWebsites.find((web) => web.id === WebsiteId.COOL_SHIRTZ)?.id;

  for (const [key, value] of coolShirtzCidMap.entries()) {
    const result = await getClothesList(`${key}`, `${id}`, {
      limit: 1,
      page: 1,
    });

    if (result.length === 0) {
      console.log(`no results from: ${key}, ${value.uri}`);
    }

    expect(result.length).toBe(1);
  }
});

test('Culture Kings', async () => {
  const id = apiWebsites.find((web) => web.id === WebsiteId.CULTURE_KINGS)?.id;

  for (const [key, value] of cultureKingsCidMap.entries()) {
    const result = await getClothesList(`${key}`, `${id}`, {
      limit: 1,
      page: 1,
    });

    if (result.length === 0) {
      console.log(`no results from: ${key}, ${value.uri}`);
    }

    expect(result.length).toBe(1);
  }
});
