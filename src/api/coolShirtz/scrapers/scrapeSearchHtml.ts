import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../../client/util/absoluteUrl';
import { parsePrice } from '../../../client/util/parsePrice';
import { ClotheItem } from '../../../types/ClotheItem';
import { COOL_SHIRTZ_BASE_URL } from '../constants';

export const scrapeSearchHtml = (htmlString: string): Partial<ClotheItem>[] => {
  const html = new JSDOM(htmlString);
  const collectedProducts: Partial<ClotheItem>[] = [];
  const products = html.window.document.getElementsByClassName('product-index');
  for (const product of products) {
    const linkElement = product.getElementsByTagName('a')[0];
    const link = `${COOL_SHIRTZ_BASE_URL}${linkElement.getAttribute('href')}`;
    const imageElement = linkElement.getElementsByTagName('img')[0];

    const moneyElements = product.getElementsByClassName('money');

    const discountedPrice = parsePrice(
      moneyElements.length === 1 ? undefined : moneyElements[0].textContent
    );

    const price = parsePrice(
      moneyElements.length === 1
        ? moneyElements[0].textContent
        : moneyElements[1].textContent
    );

    collectedProducts.push({
      name: linkElement.getAttribute('title') || 'my name jeff',
      link: link,
      image: absoluteUrl(imageElement.getAttribute('src')) || 'my image jeff',
      discountedPrice,
      price,
      website: 'Cool Shirtz',
    });
  }
  return collectedProducts;
};
