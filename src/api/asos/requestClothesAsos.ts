import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import { parsePrice } from '../../client/util/parsePrice';
import { recursiveGetClothes } from '../common/recursiveGetClothes';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { HEADERS } from '../constants';
import { ASOS_LIMIT, makeImageUrl } from './constants';
import { clothesCache } from '../common/cache';

export const requestClothesAsos = async (
  cacheKey: string,
  key: string,
  requestOptions: GetClothesOptions,
  makeUrlFunction: (key: string, requestOptions: GetClothesOptions) => string
): Promise<Partial<ClotheItem>[]> => {
  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;

  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes(
    cachedClothes,
    key,
    requestOptions,
    makeUrlFunction,
    requestData,
    ASOS_LIMIT,
    lastIndex
  );

  clothesCache.set(cacheKey, clothes);

  return clothes.slice(firstIndex, lastIndex);
};

const requestData = async (
  key: string,
  requestOptions: GetClothesOptions,
  makeUrlFunction: (key: string, requestOptions: GetClothesOptions) => string
): Promise<Partial<ClotheItem>[]> => {
  const response = await fetch(makeUrlFunction(key, requestOptions), {
    headers: {
      ...HEADERS,
      Host: ' www.asos.com',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0',
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'asos-cid': '2308d0f0-3638-42e8-bc7e-8db10c963761',
      'asos-c-plat': 'web',
      'asos-c-name': 'asos-web-product-listing-page',
      'asos-c-ver': '1.1.1-ccb48c0ea74d-3513',
      Connection: 'keep-alive',
      Referer:
        'https://www.asos.com/au/men/new-in/new-in-clothing/cat/?cid=6993&nlid=mw|clothing|shop+by+product|new+in',
      Cookie:
        '_abck=7E37EE1BD0F4F5BC1C546F936B3CA915~0~YAAQOU5haKB65z16AQAA3KMJRgY9GMR7wlflEvM43p6ymk5Uf4sqDfewA0uQDpvrIRRmsmRxwKRLMoKuUiOTEYVhvTM8qM2wlP8YudCfDIHFO2dxyx1dgkm5xnHV9NnYliZ+nCaqN5dPVGMHSeEOHSO+NFb8YCoqBSsBenXD0OIPoKkwRbs9iuQvRZZSuQWM5ULE9y+6TReXGIwnEvrSfQDWiB+RbRytMZBI5Texovi4iO97RwcF2wTtC1qTnIcblJMS0ESh+xdBvQDq9EmbYE8z3o+dnsR4k4IjpnDkTUiZCDbQ7R0duKC/kE3RfUSyXI2MZW/n66lSjCoO6XjSWBprrJyZlYFh3lflHl/Hqxxwxt1W+taEFuDXp0kxBmNIMux3QOITjNX23xJovXyu8aQkmPkmFS4=~-1~-1~-1; AMCV_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=-1303530583%7CMCMID%7C05770181098363346990208259267977844698%7CMCOPTOUT-1624679863s%7CNONE%7CvVersion%7C3.3.0%7CMCAID%7CNONE; asos=PreferredSite=&currencyid=21&currencylabel=AUD&topcatid=1001&customerguid=4482e30ba8ea40df875495304cd8393f&customerid=196556437; browseCountry=AU; browseCurrency=AUD; browseLanguage=en-AU; browseSizeSchema=AU; storeCode=AU; currency=21; featuresId=383d765d-44d4-4d48-80f1-987a95e82781; floor=1001; asos-perx=4482e30ba8ea40df875495304cd8393f|813c735398db44cd90ad5d598b481db8|41f16db6fce74c2b893bf35cc8150bff; s_pers=%20s_vnum%3D1625068800777%2526vn%253D6%7C1625068800777%3B%20s_invisit%3Dtrue%7C1624674473441%3B%20s_nr%3D1624672673442-Repeat%7C1656208673442%3B%20gpv_p10%3Ddesktop%2520au%257Cfloor%2520page%257Cmen%7C1624674473442%3B%20gpv_p6%3D%2520%7C1624674473443%3B%20gpv_e47%3Dmen%257Chome%7C1624674473444%3B; plp_columsCount=fourColumns; gig_bootstrap_3_Gl66L3LpFTiwZ8jWQ9x_4MLyUUHPRmPtRni0hzJ9RH5WA2Ro6tUv47yNXtKn3HQ8=social_ver4; _gig_llu=Cody; _gig_llp=googleplus; asos-cou998=AU; forterToken=2ded67c6f0184826b48158464aa4f8f4_1620826760561_143_UAL9c_11ck; asosAffiliate=affiliateId=17294; ai_user=1A0XJq7/xi7CcyDrNxjI7Z|2021-06-25T12:44:01.101Z; geocountry=AU; bm_sz=DFDE031058A784C181618FE7518E3D5A~YAAQOU5haFx65z16AQAA/XUJRgytGhoDvNFqAT/OohtbtsuQnVZaDDCcw2JOeLomGp4CQ7jCiZYt8jXWJ/zZvHD/2BnncY02W6GbZJnXuYCCMC0aS2OoNnDz3+zAIZby7pARnVYY9iWmvX4FvL7b72PArdOZPYFn/GY8A7zYtrEKakgeUJLktcoKRaNnKw==; siteChromeVersion=au=11&com=11&de=11&dk=11&es=11&fr=11&it=11&nl=11&pl=11&roe=11&row=11&ru=11&se=11&us=11; keyStoreDataversion=hnm9sjt-28; AMCVS_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=1; asos-b-sdv629=hnm9sjt-28; ak_bmsc=D43941CDEE810A95EFB30C9966B2536B~000000000000000000000000000000~YAAQOU5haG965z16AQAA1HwJRgwOVntamk+PTH8+rhf/velQK6wj3rAjjDFF7o1afkOPHYzI2JiWel9BLjlod1sO3SlDpQfYXh496tN6eDUSCCLbkr+yOAG8mLK0ltIe48Dk2dI5vlk6Fy8CeOM7MyNySKxfyFen0XJwwZ8VyFUebISSS68StOHR69V/YMzvylpi2Yxtgst8WpgMUfD3JsBxCygl7u7KOuQ6VDSJBRT/urI+/Iacq+oYH5DmnayZq4BBK2ZfxazS4uuuc+kzY+v8zEYziWbznJCuZhn/DOcN347O6RdfHpIzkbA3Vjuq302JyAekHckufjVkv9F3fWRyMs/ZUENhCYHirgh+cBpru32QMl34FvcezCbYzdBbMP4Gx5yPu9jr; asos-gdpr22=true; _s_fpv=true; s_cc=true; s_sq=asoscomprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Ddesktop%252520au%25257Cfloor%252520page%25257Cmen%2526link%253DNew%252520in%2526region%253De87ba617-daa1-4b64-8f36-ab92e61283f7%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c; bm_mi=D129476286B639B9566038EECED74B31~lvLnjVzL5D9eyyiCGsDZwkI7dr+u786r1DvS1XqelU6A5+SqLJLR03UAAMmqDfM4hnvnOmr8eP7YGvYT4GVWi5d6vwGIIdMRs32IZ0D4SZL0mDV3YtF25H5MOAoA/qqNpW2rwSrwJwNohyrRrvr+7C88lRUODK65nyKT6aXXCJkihtlNlWT6BEKvrN0//MkR4icwVixG/NGooA/DTx7wSQaacZSikhNXp0Q5VHSPHOiwUM9atVqo+oI4hm0fx0zD',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      TE: 'trailers',
    },
  });

  if (!response.ok) {
    return response.text().then((res: unknown) => {
      console.log('asos err', res);
      return [{ error: res }];
    });
  }

  console.log('ASOS RESPONSE OKAY');

  const htmlString = await response.text();
  return scrapeHtml(htmlString);
};

const scrapeHtml = (htmlString: string): ClotheItem[] => {
  const html = new JSDOM(htmlString);
  const collectedProducts: ClotheItem[] = [];
  const products = html.window.document.getElementsByTagName('article');
  for (const product of products) {
    const pElements = product.getElementsByTagName('p');
    const name = pElements[0].textContent;
    const price = parsePrice(
      pElements[1].getElementsByClassName('_16nzq18')[0]?.textContent
    );
    const discountedPrice = parsePrice(
      pElements[1].getElementsByClassName('_3VjzNxC')[0]?.textContent
    );
    const link = product
      .getElementsByTagName('a')[0]
      .getAttribute('href')
      ?.replace('www.', '');

    const id = product.getAttribute('id')?.replace('product-', '');
    const { image, fallbackImage } = makeImageUrl(id);

    if (!name || !price || !link || !image) {
      console.log('asos - error scraping product', {
        name,
        price,
        link,
        image,
      });
      continue;
    }

    collectedProducts.push({
      name,
      price,
      discountedPrice,
      link,
      image,
      fallbackImage,
      website: 'Asos',
    });
  }

  return collectedProducts;
};
