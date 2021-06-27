import { load } from 'cheerio';
import { absoluteUrl } from '../../../client/util/absoluteUrl';
import { parsePrice } from '../../../client/util/parsePrice';
import { ClotheItem } from '../../../types/ClotheItem';

export const scrapeListHtml = (htmlString: string): Partial<ClotheItem>[] => {
  const $ = load(htmlString);
  const collectedProducts: Partial<ClotheItem>[] = [];

  $('.product-item-info').each((i, element) => {
    const product = $(element);

    const imageContainer = product.find('.product-item-image');
    const image = $($(imageContainer).find('img')[0]);

    const priceContainer = $(product.find('.price-box')[0]);
    const price = parsePrice($(priceContainer.find('.normal-price')[0]).text());

    const oldPrice = parsePrice(
      $(priceContainer.find('.old-price')[0])
        .text()
        .replace('Regular Price', '')
    );

    collectedProducts.push({
      name: image.attr('alt') || 'my name jeff',
      link: imageContainer.attr('href') || 'my name jeff',
      image: absoluteUrl(image.attr('src')) || 'my image jeff',
      price,
      oldPrice,
      website: 'Universal Store',
    });
  });

  return collectedProducts;
};
