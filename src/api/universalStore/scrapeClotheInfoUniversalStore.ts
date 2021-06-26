import { JSDOM } from 'jsdom';
import { parsePrice } from '../../client/util/parsePrice';
import { ClotheInfo, ClotheInfoImages } from '../../types/ClotheInfo';
import { WebsiteId } from '../../websites';
import { UNIVERSAL_STORE_LOGO } from './constants';

export const scrapeClotheInfoUniversalStore = (
  htmlString: string,
  clotheLink: string
): ClotheInfo => {
  const { document } = new JSDOM(htmlString).window;

  const productInformation = document.getElementsByClassName(
    'product-text-info-container'
  )[0];
  const name =
    productInformation.getElementsByClassName('product-name')[0].textContent;

  const priceElement =
    productInformation?.getElementsByClassName('price')[0].textContent;
  const price = parsePrice(priceElement);

  const description = document
    .getElementsByClassName('info')[0]
    ?.innerHTML.trim();

  let images: ClotheInfoImages[] = [];
  const image = document
    .getElementsByClassName('loader')[0]
    ?.getElementsByTagName('img')[0]
    ?.getAttribute('src');
  if (image) images = [{ thumbnail: image, image: image }];

  if (!description || images.length === 0 || !name || !price) {
    console.log(
      'scrapeClotheInfoUniversalStore.ts - failed to get clothe info',
      `description: ${description}`,
      `images:${images}`,
      `name: ${name}`,
      `price: ${price}`
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
