import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../util/absoluteUrl';
import { ClotheInfo, ClotheInfoImages } from '../getClothes';

export const getClotheInfoAsos = async (
  clotheLink: string
): Promise<ClotheInfo> => {
  const res = await fetch(clotheLink);
  const htmlString = await res.text();
  return scrapeHtml(htmlString);
};

export const scrapeHtml = (htmlString: string): ClotheInfo => {
  const { document } = new JSDOM(htmlString).window;
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
        thumbnail: imageUrl.replace('wid=40', 'wid=150'),
      });
    }
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
