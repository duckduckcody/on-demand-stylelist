import { load } from 'cheerio';
import { absoluteUrl } from '../../../client/util/absoluteUrl/absoluteUrl';
import { parsePrice } from '../../../client/util/parsePrice';
import { ClotheItem } from '../../../types/ClotheItem';

export const scrapeListHtml = (htmlString: string): Partial<ClotheItem>[] => {
  const $ = load(htmlString);
  const collectedProducts: Partial<ClotheItem>[] = [];

  $('.product-item-info').each((i, element) => {
    const product = $(element);

    const imageContainer = product.find('.product-item-image');
    const imageElement = $($(imageContainer).find('img')[0]);

    const name = imageElement.attr('alt');

    const image = absoluteUrl(imageElement.attr('src'));

    const link = imageContainer.attr('href');

    const priceContainer = $(product.find('.price-box')[0]);
    const price = parsePrice($(priceContainer.find('.normal-price')[0]).text());

    const oldPrice = parsePrice(
      $(priceContainer.find('.old-price')[0])
        .text()
        .replace('Regular Price', '')
    );

    if (!name || !price || !link || !image) {
      console.log(
        'universal store - scrapeListHtml - error scraping product',
        `name:${!name}`,
        `price:${!price}`,
        `link:${!link}`,
        `image:${image}`
      );
      return;
    }

    collectedProducts.push({
      name,
      link,
      image,
      price,
      oldPrice,
      website: 'Universal Store',
    });
  });

  return collectedProducts;
};
