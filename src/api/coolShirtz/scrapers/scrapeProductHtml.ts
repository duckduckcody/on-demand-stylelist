import { load } from 'cheerio';
import { absoluteUrl } from '../../../client/util/absoluteUrl/absoluteUrl';
import { parsePrice } from '../../../client/util/parsePrice';
import { ClotheItem, ClotheItemSchema } from '../../../types/ClotheItem';
import { COOL_SHIRTZ_BASE_URL } from '../constants';

export const scrapeProductHtml = (htmlString: string): ClotheItem[] => {
  const $ = load(htmlString);
  const collectedProducts: ClotheItem[] = [];

  $('.prod-container').each((i, element) => {
    const collectedProduct: Partial<ClotheItem> = {
      website: 'Cool Shirtz',
    };

    const product = $(element);

    if (product.find('.so')[0]) return;

    const linkElement = $(product.find('.grid-view-item__link')[0]);

    if (!linkElement.attr('href')) {
      return console.log(`bad href: ${linkElement.attr('href')}`);
    }

    collectedProduct.link = `${COOL_SHIRTZ_BASE_URL}${linkElement.attr(
      'href'
    )}`;

    collectedProduct.name = $(linkElement.find('h3')[0])?.text();

    collectedProduct.image = absoluteUrl(
      $(product.find('.product-grid-view-item')[0]).attr('data-bgset')
    );

    const moneyElements = product.find('.money');
    collectedProduct.oldPrice = parsePrice($(moneyElements[1]).text());
    collectedProduct.price = parsePrice($(moneyElements[0]).text());

    const response = ClotheItemSchema.safeParse(collectedProduct);
    if (!response.success) {
      return console.log(response.error.message);
    }

    collectedProducts.push(response.data);
  });

  return collectedProducts;
};
