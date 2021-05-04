import { Gender } from './types/Gender';

export enum CategoryName {
  SHIRTS = 'shirts',
  JUMPERS = 'jumpers',
  HOODIES = 'hoodies',
  JACKETS = 'jackets',
  SHORTS = 'shorts',
  JEANS = 'jeans',
  SHOES = 'shoes',
  BOOTS = 'boots',
  SKIRTS = 'skirts',
  DRESSES = 'dresses',
  TRACK_PANTS = 'track pants',
}

export interface Category {
  id: number;
  name: CategoryName;
  gender: Gender;
}

let id = 1;
export const categories: Category[] = [
  { id: id++, name: CategoryName.SHIRTS, gender: Gender.MEN },
  { id: id++, name: CategoryName.JUMPERS, gender: Gender.MEN },
  { id: id++, name: CategoryName.HOODIES, gender: Gender.MEN },
  { id: id++, name: CategoryName.JACKETS, gender: Gender.MEN },
  { id: id++, name: CategoryName.SHORTS, gender: Gender.MEN },
  { id: id++, name: CategoryName.JEANS, gender: Gender.MEN },
  { id: id++, name: CategoryName.TRACK_PANTS, gender: Gender.MEN },
  { id: id++, name: CategoryName.SHOES, gender: Gender.MEN },
  { id: id++, name: CategoryName.BOOTS, gender: Gender.MEN },
  { id: id++, name: CategoryName.SKIRTS, gender: Gender.WOMEN },
  { id: id++, name: CategoryName.DRESSES, gender: Gender.WOMEN },
  { id: id++, name: CategoryName.TRACK_PANTS, gender: Gender.WOMEN },
];
export const getCategoryId = (name: CategoryName, gender: Gender): number => {
  const cat = categories.find(
    (cat) => cat.name === name && cat.gender === gender
  );
  if (!cat)
    throw new Error(
      `getCategoryId - category not found with parameters name:${name} gender:${gender}`
    );
  return cat.id;
};

export const makeCategoryImageLink = (category: Category): string =>
  `/shop_${category.gender}_${category.name.replace(' ', '_')}.webp`;
