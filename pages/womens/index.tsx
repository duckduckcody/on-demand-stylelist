import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { categories, Category } from '../../src/categories';
import { CategoryTileList } from '../../src/client/components/categoryTileList/CategoryTileList';
import { Gender } from '../../src/types/Gender';

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
