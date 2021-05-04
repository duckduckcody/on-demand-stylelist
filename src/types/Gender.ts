import { parseToEnumValue } from '../client/util/parseToEnumValue';

export enum Gender {
  MEN = 'mens',
  WOMEN = 'womens',
  UNISEX = 'unisex',
}
export const genderValues: string[] = Object.values(Gender);
export const parseGender = (value: unknown): Gender | undefined =>
  parseToEnumValue<Gender>(value, genderValues);
