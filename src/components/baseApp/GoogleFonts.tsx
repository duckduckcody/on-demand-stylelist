import { ReactElement } from 'react';

interface Props {
  query: string;
}

export const GoogleFonts = ({ query }: Props): ReactElement => (
  <>
    <link rel='preconnect' href='https://fonts.gstatic.com' />
    <link
      href={`https://fonts.googleapis.com/css2?${query}`}
      rel='stylesheet'
    />
  </>
);
