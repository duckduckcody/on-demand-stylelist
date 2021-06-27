import { load } from 'cheerio';
import { parsePrice } from '../../../client/util/parsePrice';
import { ClotheInfo, ClotheInfoImages } from '../../../types/ClotheInfo';
import { WebsiteId } from '../../../websites';
import { UNIVERSAL_STORE_LOGO } from '../constants';

export const scrapeClotheInfoUniversalStore = (
  htmlString: string,
  clotheLink: string
): ClotheInfo => {
  const $ = load(htmlString);

  const productInformation = $($('.product-text-info-container')[0]);

  const name = $(productInformation.find('.product-name')[0]).text();

  const priceElement = $(productInformation?.find('.price')[0]).text();
  const price = parsePrice(priceElement);

  const description = $($('.info')[0]).text().trim();

  let images: ClotheInfoImages[] = [];
  const image = $($($('loader')[0]).find('img')[0]).attr('src');
  if (image) images = [{ thumbnail: image, image: image }];

  if (!description || images.length === 0 || !name || !price) {
    console.log(
      'scrapeClotheInfoUniversalStore.ts - failed to get clothe info',
      `description:${!description}`,
      `images:${images.length === 0}`,
      `name:${!name}`,
      `price:${!price}`
    );
    throw new Error();
  }

  return {
    name: name,
    price: price,
    websitesLogo: UNIVERSAL_STORE_LOGO,
    websiteName: 'Universal Store',
    websiteId: WebsiteId.UNIVERSAL_STORE,
    link: clotheLink,
    images,
    description,
  };
};
