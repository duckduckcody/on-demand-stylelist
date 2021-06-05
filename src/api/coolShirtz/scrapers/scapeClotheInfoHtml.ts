import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../../client/util/absoluteUrl';
import { parsePrice } from '../../../client/util/parsePrice';
import {
  ClotheInfo,
  ClotheInfoImages,
  RelatedProducts,
} from '../../../types/ClotheInfo';
import { WebsiteId } from '../../../websites';
import { THUMBNAIL_WIDTH } from '../../constants';
import { COOL_SHIRTZ_BASE_URL, COOL_SHIRTZ_LOGO } from '../constants';

export const scrapeClotheInfoHtml = (
  htmlString: string,
  clotheLink: string
): ClotheInfo => {
  const { document } = new JSDOM(htmlString).window;
  let soldOut = false;
  let price = 0;

  const productInformation = document.getElementById('product-information');
  const name = productInformation?.getElementsByTagName('h1')[0].innerHTML;

  const priceElement =
    productInformation?.getElementsByClassName('product-price')[0].textContent;
  if (priceElement === 'Sold Out') {
    soldOut = true;
  } else {
    price = parsePrice(priceElement) || 0;
  }

  const description = document
    .getElementById('product-description')
    ?.innerHTML.trim();

  const images: ClotheInfoImages[] = [];
  const imageElements = document.getElementsByClassName('thumb clicker-thumb');
  for (const imageElement of imageElements) {
    const imageUrl =
      absoluteUrl(imageElement.getAttribute('href')) || undefined;

    if (imageUrl) {
      images.push({
        image: imageUrl,
        thumbnail: imageUrl.replace('x1440', `x${THUMBNAIL_WIDTH}`),
      });
    }
  }

  const relatedProducts: RelatedProducts[] = [];
  const relatedProductsContainer = document.getElementById('related');
  const relatedProductElements =
    relatedProductsContainer?.getElementsByClassName('related-product') || [];
  for (const relatedProductElement of relatedProductElements) {
    const aElement = relatedProductElement.getElementsByTagName('a')[0];
    const link = `${COOL_SHIRTZ_BASE_URL}${aElement.getAttribute('href')}`;
    const name = aElement.getAttribute('title');
    const image = relatedProductElement
      .getElementsByTagName('img')[0]
      .getAttribute('data-src');

    if (link && name && image) {
      relatedProducts.push({
        link,
        name,
        image,
      });
    }
  }

  if (!description || images.length === 0 || !name || (!soldOut && !price)) {
    console.log(
      'getClotheInfoCoolShirtz.ts - scrapeHtml() - failed to get clothe info',
      `description: ${description}`,
      `images:${images}`,
      `name: ${name}`,
      `price: ${price}`,
      `soldOut: ${soldOut}`
    );
    throw new Error();
  }

  return {
    name: name,
    price: price,
    soldOut,
    websitesLogo: COOL_SHIRTZ_LOGO,
    websiteName: 'Cool Shirtz',
    websiteId: WebsiteId.COOL_SHIRTZ,
    link: clotheLink,
    images,
    description,
    relatedProducts,
  };
};
