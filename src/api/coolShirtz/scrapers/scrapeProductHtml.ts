import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../../client/util/absoluteUrl';
import { parsePrice } from '../../../client/util/parsePrice';
import { ClotheItem } from '../../../types/ClotheItem';
import { COOL_SHIRTZ_BASE_URL } from '../constants';

export const scrapeProductHtml = (htmlString: string): ClotheItem[] => {
  const html = new JSDOM(htmlString);
  const collectedProducts: ClotheItem[] = [];
  const products =
    html.window.document.getElementsByClassName('prod-container');
  for (const product of products) {
    //don't scrape sold out products
    if (product.getElementsByClassName('so icn')[0]) continue;

    const linkElement = product.getElementsByClassName('product-link')[0];
    const name = linkElement.getAttribute('title');

    const link = `${COOL_SHIRTZ_BASE_URL}${linkElement.getAttribute('href')}`;
    const image = absoluteUrl(
      product.getElementsByTagName('img')[0].getAttribute('data-src')
    );

    const moneyElements = product.getElementsByClassName('money');

    const discountedPrice = parsePrice(
      moneyElements.length === 1 ? undefined : moneyElements[0].textContent
    );

    const price = parsePrice(
      moneyElements.length === 1
        ? moneyElements[0].textContent
        : moneyElements[1].textContent
    );

    if (!name || !price || !link || !image) {
      console.log('cool shirtz - error scraping product', {
        name,
        price,
        link,
        image,
      });
      continue;
    }

    collectedProducts.push({
      name,
      price,
      discountedPrice,
      link,
      image,
      website: 'Cool Shirtz',
    });
  }
  return collectedProducts;
};
