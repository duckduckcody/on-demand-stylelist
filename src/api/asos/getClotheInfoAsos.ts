import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../client/util/absoluteUrl';
import { ClotheInfo, ClotheInfoImages } from '../../types/ClotheInfo';
import { WebsiteId } from '../../websites';
import { THUMBNAIL_WIDTH } from '../constants';
import { ASOS_LOGO } from './constants';

export const getClotheInfoAsos = async (
  clotheUrl: URL
): Promise<ClotheInfo> => {
  return fetch(clotheUrl.href)
    .then((res) => res.text())
    .then((htmlString) => scrapeHtml(htmlString, clotheUrl.href))
    .catch((e) => Promise.reject(e));
};

export const scrapeHtml = (
  htmlString: string,
  clotheLink: string
): ClotheInfo => {
  const { document } = new JSDOM(htmlString).window;

  const productInfoElement = document.getElementById('aside-content');
  const name = productInfoElement?.getElementsByTagName('h1')[0].innerHTML;
  const price = 120;

  const images: ClotheInfoImages[] = [];
  const imageElements = document.getElementsByClassName('image-thumbnail');
  for (const imageElement of imageElements) {
    const imageUrl =
      absoluteUrl(
        imageElement.getElementsByTagName('img')[0].getAttribute('src')
      ) || undefined;

    if (imageUrl) {
      images.push({
        image: imageUrl.replace('wid=40', 'wid=1000'),
        thumbnail: imageUrl.replace('wid=40', `wid=${THUMBNAIL_WIDTH}`),
      });
    }
  }

  const descriptionElement = document.getElementById(
    'product-details-container'
  );
  descriptionElement?.getElementsByClassName('show-more')[0].remove();
  descriptionElement?.getElementsByClassName('product-code')[0].remove();
  const description = descriptionElement?.innerHTML.trim();

  if (!description || images.length === 0 || !name || !price) {
    console.log(
      'getClotheInfoAsos.ts - scrapeHtml() - failed to get clothe info',
      `description: ${description}`,
      `images:${images}`,
      `name:${name}`,
      `price:${price}`
    );
    throw new Error();
  }

  return {
    name,
    price,
    websitesLogo: ASOS_LOGO,
    websiteName: 'Asos',
    websiteId: WebsiteId.ASOS,
    link: clotheLink,
    images,
    description,
  };
};
