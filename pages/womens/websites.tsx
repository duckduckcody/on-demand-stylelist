import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import {
  WebsiteProps,
  Websites,
} from '../../src/client/pages/websites/Websites';
import { websites } from '../../src/websites';

export const getStaticProps: GetStaticProps = async () => ({
  props: { websites: websites },
});

export default function WomensWebsites({
  websites,
}: WebsiteProps): ReactElement {
  return <Websites websites={websites} />;
}
