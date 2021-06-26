import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../client/util/absoluteUrl';
import { parsePrice } from '../../client/util/parsePrice';
import { ClotheItem } from '../../types/ClotheItem';

export const scrapeListHtml = (htmlString: string): Partial<ClotheItem>[] => {
  const html = new JSDOM(htmlString);
  const collectedProducts: Partial<ClotheItem>[] = [];
  const products =
    html.window.document.getElementsByClassName('product-item-info');

  for (const product of products) {
    const imageContainer =
      product.getElementsByClassName('product-item-image')[0];
    const image = imageContainer.getElementsByTagName('img')[0];

    const priceContainer = product.getElementsByClassName('price-box')[0];
    const price = parsePrice(
      priceContainer.getElementsByClassName('normal-price')[0]?.textContent
    );

    const oldPrice = parsePrice(
      priceContainer
        .getElementsByClassName('old-price')[0]
        ?.textContent?.replace('Regular Price', '')
    );

    collectedProducts.push({
      name: image.getAttribute('alt') || 'my name jeff',
      link: imageContainer.getAttribute('href') || 'my name jeff',
      image: absoluteUrl(image.getAttribute('src')) || 'my image jeff',
      price,
      oldPrice,
      website: 'Universal Store',
    });
  }

  return collectedProducts;
};
