import { load } from 'cheerio';
import { absoluteUrl } from '../../../client/util/absoluteUrl';
import { parsePrice } from '../../../client/util/parsePrice';
import { ClotheItem } from '../../../types/ClotheItem';
import { COOL_SHIRTZ_BASE_URL } from '../constants';

export const scrapeProductHtml = (htmlString: string): ClotheItem[] => {
  const $ = load(htmlString);
  const collectedProducts: ClotheItem[] = [];

  $('.prod-container').each((i, element) => {
    const product = $(element);

    if (product.find('.so')[0]) return;

    const linkElement = $(product.find('.product-link')[0]);

    const name = linkElement.attr('title');

    const link = `${COOL_SHIRTZ_BASE_URL}${linkElement.attr('href')}`;

    const image = absoluteUrl($(product.find('img')[0]).attr('data-src'));

    const moneyElements = product.find('.money');
    const oldPrice = parsePrice($(moneyElements[1]).text());
    const price = parsePrice($(moneyElements[0]).text());

    if (!name || !price || !link || !image) {
      console.log(
        'cool shirtz - scrapeProductHtml - error scraping product',
        `name:${!name}`,
        `price:${!price}`,
        `link:${!link}`,
        `image:${image}`
      );
      return;
    }

    collectedProducts.push({
      name,
      price,
      oldPrice,
      link,
      image,
      website: 'Cool Shirtz',
    });
  });

  return collectedProducts;
};
