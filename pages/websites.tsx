import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { Websites, WebsitesProps } from '../src/client/pages/websites/Websites';
import { websites } from '../src/websites';

export const getStaticProps: GetStaticProps = async () => {
  fetch(
    'https://www.asos.com/api/product/search/v2/?channel=desktop-web&country=AU&currency=AUD&keyStoreDataversion=hgk0y12-29&lang=en-AU&limit=72&offset=72&q=shirt&rowlength=4&store=AU'
  )
    .then((response) => response.json())
    .then((json) => console.log('ASOS JSON RESPONSE', json));

  return {
    props: { websites: websites },
  };
};

export default function index({ websites }: WebsitesProps): ReactElement {
  return <Websites websites={websites} />;
}
