import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';

const Tile = styled.div<{ imageSrc: string }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  background: center / cover no-repeat url(${(p) => p.imageSrc});
  background-color: rgba(0, 0, 0, 0.1);
  background-blend-mode: darken;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

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
  <Link href={link}>
    <Tile className={className} imageSrc={imageSrc}>
      {children}
    </Tile>
  </Link>
);
