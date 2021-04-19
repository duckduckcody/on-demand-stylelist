import { NextApiRequest, NextApiResponse } from 'next';
import { makeAsosApiUrl } from '../../src/api/asos/constants';
import { getClothesAsos } from '../../src/api/asos/getClothesAsos';
import { HEADERS } from '../../src/api/constants';
import { ClotheSortOption } from '../../src/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = await fetch(
    'https://www.asos.com/api/product/search/v2/categories/27111?channel=desktop-web&country=AU&currency=AUD&keyStoreDataversion=hnm9sjt-28&lang=en-AU&limit=72&offset=72&rowlength=4&store=AU',
    {
      headers: {
        Host: 'www.asos.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0',
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'asos-cid': 'f574db4e-122c-4cea-a033-1a79d8088fba',
        'asos-c-plat': 'web',
        'asos-c-name': 'asos-web-product-listing-page',
        'asos-c-ver': '1.1.1-72c5eed88af5-2847',
        Connection: 'keep-alive',
        Referer:
          'https://www.asos.com/au/men/designer/cat/?cid=27111&nlid=mw%7Cclothing%7Cshop%20by%20product%7Cdesigner&page=2',
        Cookie:
          '_abck=7E37EE1BD0F4F5BC1C546F936B3CA915~-1~YAAQBYNHaNxar9h4AQAANOAN6AXDuIG0NTAAerVs4lPxuMy0JxrmKbQZmRhd6RQrbN5NwElUfyOFi6Cr39+Hi1sAu7YQIS2MRfs/8EN9yIhzFyPXPXmbWVUSU/M8HZ6Vp7ceTnbQfx63PjS84oEwTfJlo3uxIvb1Czbnqsjky54tJ/RiTQQBX2MK4gJWf3/82VoCqjAj0XaGQJb/V5fXUZAbB+YiU7/qfB8FUONMzz1MgmpwsoGaI0aJVNbQf3SyDUYK7JbbaxpsWqQG5SjP4F/qlJ60rFhk3eGYCQg1w9xjdazAS/9kuicbZ0/kFMybycz4gRJKNQwXgrzkEoQvU3Z8I0BcUBvAh+WvXxOoP6xOkfpyadC7H/+OtwwayjvtVhh7if0OY3zURytP9FB2OTppcO19oPlr~-1~-1~-1; AMCV_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=-1303530583%7CMCMID%7C05770181098363346990208259267977844698%7CMCOPTOUT-1618808113s%7CNONE%7CvVersion%7C3.3.0%7CMCAID%7CNONE; asosAffiliate=affiliateId=17294; asos=PreferredSite=&currencyid=21&currencylabel=AUD&topcatid=1001&customerguid=4482e30ba8ea40df875495304cd8393f&customerid=196556437; browseCountry=AU; browseCurrency=AUD; browseLanguage=en-AU; browseSizeSchema=AU; storeCode=AU; currency=21; featuresId=383d765d-44d4-4d48-80f1-987a95e82781; floor=1001; asos-perx=4482e30ba8ea40df875495304cd8393f|25e1339034734a5292eab2ead8eda18e|223a27a902b644259af824b6ddb72394; s_pers=%20s_vnum%3D1619798400106%2526vn%253D16%7C1619798400106%3B%20gpv_p6%3D%2520%7C1618802714208%3B%20s_invisit%3Dtrue%7C1618802724833%3B%20s_nr%3D1618800924834-Repeat%7C1650336924834%3B%20gpv_e47%3Dno%2520value%7C1618802724834%3B%20gpv_p10%3Ddesktop%2520au%257Ccategory%2520page%257C27111%7C1618802724834%3B; plp_columsCount=fourColumns; gig_bootstrap_3_Gl66L3LpFTiwZ8jWQ9x_4MLyUUHPRmPtRni0hzJ9RH5WA2Ro6tUv47yNXtKn3HQ8=social_ver4; _gig_llu=Cody; _gig_llp=googleplus; asos-cou998=AU; geocountry=AU; bm_sz=3082739F8755FC65CE81204A6672B815~YAAQBYNHaLBZr9h4AQAA4qoN6Av7LBCNOfq9bpXJGJtuCdhvcdHgLP/5JSwGa0em/NYKCyYP6mpoysMgLuxUvd8jE62PVYNKwzCGDgjACRG2G2gT4vEuM4swv04c/pYL4ja2+dQk+u6oXw8+RGxZC2+L3IiWmjPrCQIwxMyELsP9U/SOGelIjnyotp1MsA==; siteChromeVersion=au=11&com=11&de=11&dk=11&es=11&fr=11&it=11&nl=11&pl=11&roe=11&row=11&ru=11&se=11&us=11; keyStoreDataversion=hnm9sjt-28; AMCVS_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=1; asos-b-sdv629=hnm9sjt-28; ak_bmsc=4640F83E7F372D732D61AA9D13C810BB684783052521000012F17C6052031871~pl01j8gMyXCkwQFajvfQ1WzV2A5DQkHXSwSbYp+AbQFy7acZChxHo9AiItfZtV5Zu5CSNpUQTmVrULD2RyWVfsdDPSVVnUafJv80jWZQ/Al3cSIM5VSSdoneTw5larjPb34Nv+15UD5wufyZjF9/8kpJWf4G7j72cHIBCK9qh2XOOT/9lmlO3BaggsogvdW/qKrK4pn88tiqVgtTLLj+KNau8yqFKAts7vAEC8OaOD1Mo=; asos-gdpr22=true; _s_fpv=true; s_cc=true; s_sq=asoscomprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Ddesktop%252520au%25257Ccategory%252520page%25257C27111%2526link%253DLOAD%252520MORE%2526region%253Dplp%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c; bm_mi=E8E5C67022F8EC74CC9943E153221859~DvrFYjjbyRCc/WNtZRR1YhnkxSXHqPi/Q08oUP0zIXUx81w2g/Sjjp9FOxIH9mppNGcys7HuptyFnEhYVFWtL+pu5CTvqxyd4/8eDTxav2/D/g4V/s11sQGz+dEWaFdiFaDP0poPeW754vaheuuUqRb/IIK5AoisADOpaKpOXwQbQCnJnha+8ZxZ50tHi1c3NljdMGSgZ0xCKT/Sy0mzRhLXFm+MjBXdVkMs00CxtICuONK1HwD0O5LNLIR9Z+eI',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        TE: 'Trailers',
      },
    }
  );

  console.log('response', response);

  return response.text().then((text) => {
    return res.status(200).json({ res: text, status: res.statusCode });
  }).catch(() => {
    response.json().then((j) => console.log('j', j);
  })
}
