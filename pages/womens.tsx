import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import {
  categories,
  Category,
  Gender,
  LocalStorageKey,
} from '../src/constants';

const CategoryLink = styled.a`
  text-transform: capitalize;
  cursor: pointer;
  text-decoration: underline;
  color: blue;
  display: block;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
`;

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    categories: categories.filter((cat) => cat.gender === Gender.WOMEN),
  },
});

interface Props {
  categories: Category[];
}

export default function Womens({ categories }: Props): ReactElement {
  useEffect(() => {
    window.localStorage.setItem(LocalStorageKey.Gender, Gender.WOMEN);
  }, []);

  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/clothes/${category.gender}/${category.name}`}
        >
          <CategoryLink>
            {category.gender}&apos;s {category.name}
          </CategoryLink>
        </Link>
      ))}
    </>
  );
}
