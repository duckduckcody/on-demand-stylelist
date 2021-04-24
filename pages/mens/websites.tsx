import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { WebsiteData, websiteData } from '../../src/api/constants';
import { Websites } from '../../src/components/websites/Websites';

export const getStaticProps: GetStaticProps = async () => ({
  props: { websites: websiteData },
});

interface Props {
  websites: WebsiteData[];
}

export default function MensWebsites({ websites }: Props): ReactElement {
  return <Websites websites={websites} />;
}
