import { GetStaticProps } from 'next';
import Link from 'next/link';
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

export const getStaticProps: GetStaticProps = async (context) => ({
  props: { categories: categories },
});

interface Props {
  categories: Category[];
}

export default function Home({ categories }: Props) {
  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/clothes/${category.gender}/${category.name}`}
        >
          <CategoryLink>
            {category.gender}'s {category.name}
          </CategoryLink>
        </Link>
      ))}
    </>
  );
}
