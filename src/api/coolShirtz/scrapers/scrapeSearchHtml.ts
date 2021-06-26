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
    const oldPrice = parsePrice(moneyElements[1]?.textContent);
    const price = parsePrice(moneyElements[0].textContent);

    collectedProducts.push({
      name: linkElement.getAttribute('title') || 'my name jeff',
      link: link,
      image: absoluteUrl(imageElement.getAttribute('src')) || 'my image jeff',
      oldPrice,
      price,
      website: 'Cool Shirtz',
    });
  }
  return collectedProducts;
};
