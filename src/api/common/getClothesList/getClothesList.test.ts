import { categories, CategoryName } from '../../../categories';
import { WebsiteId } from '../../../websites';
import { apiWebsites } from '../../apiWebsites';
import { getClothesList } from './getClothesList';

test('cool shirts shirts', async () => {
  const shirts = categories.find((cat) => cat.name === CategoryName.SHIRTS)?.id;

  const coolShirtzId = apiWebsites.find(
    (web) => web.id === WebsiteId.COOL_SHIRTZ
  )?.id;

  const result = await getClothesList(`${shirts}`, `${coolShirtzId}`, {
    limit: 1,
    page: 1,
  });

  console.log('result', result);

  expect(result.length).toBe(1);
});
