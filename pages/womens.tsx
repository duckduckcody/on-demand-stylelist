import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ReactElement, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PreferredGenderContext } from '../src/components/baseApp/BaseApp';
import { categories, Category, Gender } from '../src/constants';

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
  const { setPreferredGender } = useContext(PreferredGenderContext);
  useEffect(() => setPreferredGender(Gender.WOMEN), [setPreferredGender]);

  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/clothes/${category.gender}/${category.name}`}
        >
          <CategoryLink>
            {category.gender.replace(`s`, `'s`)} {category.name}
          </CategoryLink>
        </Link>
      ))}
    </>
  );
}
