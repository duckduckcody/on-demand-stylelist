import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { Websites } from '../../src/components/websites/Websites';
import { WebsiteData, websiteData } from '../../src/websites';

export const getStaticProps: GetStaticProps = async () => ({
  props: { websites: websiteData },
});

interface Props {
  websites: WebsiteData[];
}

export default function MensWebsites({ websites }: Props): ReactElement {
  return <Websites websites={websites} />;
}
