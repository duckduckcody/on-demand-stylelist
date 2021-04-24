import { GetStaticProps } from 'next';
import { ReactElement, useContext, useEffect } from 'react';
import { PreferredGenderContext } from '../../src/components/baseApp/BaseApp';
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
  const { setPreferredGender } = useContext(PreferredGenderContext);
  useEffect(() => setPreferredGender(Gender.WOMEN), [setPreferredGender]);

  return <CategoryTileList categories={categories} />;
}
