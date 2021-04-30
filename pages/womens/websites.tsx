import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { WebsiteProps, Websites } from '../../src/components/websites/Websites';
import { frontEndWebsites } from '../../src/frontEndWebsites';

export const getStaticProps: GetStaticProps = async () => ({
  props: { websites: frontEndWebsites },
});

export default function WomensWebsites({
  websites,
}: WebsiteProps): ReactElement {
  return <Websites websites={websites} />;
}
