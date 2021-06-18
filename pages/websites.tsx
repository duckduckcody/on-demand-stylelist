import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { Websites, WebsitesProps } from '../src/client/pages/websites/Websites';
import { websites } from '../src/websites';

export const getStaticProps: GetStaticProps = async () => ({
  props: { websites: websites },
});

export default function index({ websites }: WebsitesProps): ReactElement {
  return <Websites websites={websites} />;
}
