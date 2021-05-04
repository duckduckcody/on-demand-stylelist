import Link from 'next/link';
import { ReactElement } from 'react';
import { Tile } from './ShopTile.styles';

interface Props {
  imageSrc?: string;
  link: string;
  children: ReactElement;
  className?: string;
}

export const ShopTile = ({
  imageSrc = '',
  link,
  children,
  className,
}: Props): ReactElement => (
  <Link href={link} passHref>
    <Tile className={className} imageSrc={imageSrc}>
      {children}
    </Tile>
  </Link>
);
