import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { baseWebsites } from '../../src/baseWebsites';
import { WebsiteProps, Websites } from '../../src/components/websites/Websites';

export const getStaticProps: GetStaticProps = async () => ({
  props: { websites: baseWebsites },
});

export default function MensWebsites({ websites }: WebsiteProps): ReactElement {
  return <Websites websites={websites} />;
}
