import { GetStaticProps } from 'next';
import { ReactElement, useContext, useEffect } from 'react';
import { PreferredGenderContext } from '../../src/components/baseApp/BaseApp';
import { CategoryTileList } from '../../src/components/categoryTileList/CategoryTileList';
import { categories, Category, Gender } from '../../src/constants';

export const getStaticProps: GetStaticProps = async () => ({
  props: { categories: categories.filter((cat) => cat.gender === Gender.MEN) },
});

interface Props {
  categories: Category[];
}

export default function Mens({ categories }: Props): ReactElement {
  const { setPreferredGender } = useContext(PreferredGenderContext);
  useEffect(() => setPreferredGender(Gender.MEN), [setPreferredGender]);

  return <CategoryTileList categories={categories} />;
}
