import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../util/absoluteUrl';
import { ClotheInfo } from '../getClothes';

export const getClotheInfoAsos = async (
  clotheLink: string
): Promise<ClotheInfo> => {
  const res = await fetch(clotheLink);
  const htmlString = await res.text();
  return scrapeHtml(htmlString);
};

export const scrapeHtml = (htmlString: string): ClotheInfo => {
  const { document } = new JSDOM(htmlString).window;
  const images = [];
  const imageElements = document.getElementsByClassName('image-thumbnail');
  for (const imageElement of imageElements) {
    images.push(
      absoluteUrl(
        imageElement.getElementsByTagName('img')[0].getAttribute('src')
      ) || undefined
    );
  }
  const description = document
    .getElementsByClassName('product-description')[0]
    ?.innerHTML.trim();

  // const websitesLogo =
  //   document.getElementById('cool-logo-nav')?.getAttribute('data-src') ||
  //   undefined;

  return {
    websitesLogo: '',
    images,
    description,
  };
};
