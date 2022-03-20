import { load } from 'cheerio';
import { absoluteUrl } from '../../../client/util/absoluteUrl/absoluteUrl';
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
  const $ = load(htmlString);
  let soldOut = false;
  let price = 0;

  const productInformation = $('#product-information');
  const name = $(productInformation.find('h1')[0]).text();

  const priceElement = $(productInformation.find('.product-price')[0]).text();
  if (priceElement === 'Sold Out') {
    soldOut = true;
  } else {
    price = parsePrice(priceElement) || 0;
  }

  const description = $('#product-description').text().trim();

  const images: ClotheInfoImages[] = [];
  $('.thumb').each((i, element) => {
    const imageElement = $(element);
    const imageUrl = absoluteUrl(imageElement.attr('href')) || undefined;

    if (imageUrl) {
      images.push({
        image: imageUrl,
        thumbnail: imageUrl.replace('x1440', `x${THUMBNAIL_WIDTH}`),
      });
    }
  });

  const relatedProducts: RelatedProducts[] = [];
  $('.related-product').each((i, element) => {
    const relatedProductElement = $(element);
    const aElement = $(relatedProductElement.find('a')[0]);
    const link = `${COOL_SHIRTZ_BASE_URL}${aElement.attr('href')}`;
    const name = aElement.attr('title');
    const image = $(relatedProductElement.find('img')[0]).attr('data-src');

    if (link && name && image) {
      relatedProducts.push({
        link,
        name,
        image,
      });
    }
  });

  if (!description || images.length === 0 || !name || (!soldOut && !price)) {
    console.log(
      'cool shirtz - scrapeClotheInfoHtml - error scraping product',
      `description: ${!description}`,
      `images:${images.length === 0}`,
      `name: ${!name}`,
      `price: ${!price}`,
      `soldOut: ${!soldOut}`
    );
    throw new Error();
  }

  return {
    name,
    price,
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
