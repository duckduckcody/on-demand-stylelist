import { load } from 'cheerio';
import { absoluteUrl } from '../../../client/util/absoluteUrl';
import { parsePrice } from '../../../client/util/parsePrice';
import { ClotheItem } from '../../../types/ClotheItem';
import { COOL_SHIRTZ_BASE_URL } from '../constants';

export const scrapeSearchHtml = (htmlString: string): Partial<ClotheItem>[] => {
  const $ = load(htmlString);
  const collectedProducts: Partial<ClotheItem>[] = [];

  $('product-index').each((i, element) => {
    const product = $(element);

    const linkElement = $(product.find('a')[0]);
    const link = `${COOL_SHIRTZ_BASE_URL}${linkElement.attr('href')}`;

    const name = linkElement.attr('title');

    const imageElement = $(linkElement.find('img')[0]);
    const image = absoluteUrl(imageElement.attr('src'));

    const moneyElements = product.find('.money');
    const oldPrice = parsePrice($(moneyElements[1]).text());
    const price = parsePrice($(moneyElements[0]).text());

    if (!name || !price || !link || !image) {
      console.log('cool shirtz - scrapeSearchHtml - error scraping product', {
        name,
        price,
        link,
        image,
      });
      return;
    }

    collectedProducts.push({
      name,
      link,
      image,
      oldPrice,
      price,
      website: 'Cool Shirtz',
    });
  });

  return collectedProducts;
};
