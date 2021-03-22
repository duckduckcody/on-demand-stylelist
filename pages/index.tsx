import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { categories, Category } from '../src/api/constants';

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
  props: { categories: categories },
});

interface Props {
  categories: Category[];
}

export default function Home({ categories }: Props): ReactElement {
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
