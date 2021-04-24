import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { CategoryTileList } from '../../src/components/categoryTileList/CategoryTileList';
import { categories, Category, Gender } from '../../src/constants';

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    categories: categories.filter((cat) => cat.gender === Gender.WOMEN),
  },
});

interface Props {
  categories: Category[];
}

export default function Womens({ categories }: Props): ReactElement {
  return <CategoryTileList categories={categories} />;
}
