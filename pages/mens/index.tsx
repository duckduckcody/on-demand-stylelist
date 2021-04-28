import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { categories, Category } from '../../src/categories';
import { CategoryTileList } from '../../src/components/categoryTileList/CategoryTileList';
import { Gender } from '../../src/constants';

export const getStaticProps: GetStaticProps = async () => ({
  props: { categories: categories.filter((cat) => cat.gender === Gender.MEN) },
});

interface Props {
  categories: Category[];
}

export default function Mens({ categories }: Props): ReactElement {
  return <CategoryTileList categories={categories} />;
}
