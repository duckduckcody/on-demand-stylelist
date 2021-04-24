import { ReactElement } from 'react';
import { Category, makeCategoryImageLink } from '../../constants';
import { ShopTile } from '../shopTile/ShopTile';
import {
  CategoryLink,
  CategoryTileListContainer,
} from './CategoryTileList.styles';

interface Props {
  categories: Category[];
}

export const CategoryTileList = ({ categories }: Props): ReactElement => (
  <CategoryTileListContainer>
    {categories.map((category) => (
      <ShopTile
        key={category.id}
        link={`/${category.gender}/${category.name}`}
        imageSrc={makeCategoryImageLink(category)}
      >
        <CategoryLink>SHOP {category.name.toUpperCase()}</CategoryLink>
      </ShopTile>
    ))}
  </CategoryTileListContainer>
);
