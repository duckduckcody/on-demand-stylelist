import startCase from 'lodash.startcase';
import { ReactElement } from 'react';
import {
  ClotheSortOption,
  clotheSortOptionValues,
} from '../../../../types/ClotheSort';
import { LIMIT_OPTIONS } from '../../../constants';
import {
  Container,
  ContainerOffset,
  Option,
  OptionsContainer,
} from './ListOptionsHeader.styles';

interface Props {
  context: string;
  limit: number | undefined;
  onChangeLimit: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  clotheSortOption?: ClotheSortOption | undefined;
  onChangeClotheSortOption?: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export const ListOptionsHeader = ({
  context,
  limit,
  onChangeLimit,
  clotheSortOption,
  onChangeClotheSortOption,
}: Props): ReactElement => {
  return (
    <>
      <Container>
        <span>{context}</span>
        <OptionsContainer>
          <Option htmlFor='limit'>
            Limit per website&nbsp;
            <select value={limit} onChange={onChangeLimit}>
              {LIMIT_OPTIONS.map((limitOption) => (
                <option key={limitOption} value={limitOption}>
                  {limitOption}
                </option>
              ))}
            </select>
          </Option>
          {clotheSortOption && onChangeClotheSortOption && (
            <Option htmlFor='sort'>
              Sort&nbsp;
              <select
                value={clotheSortOption}
                onChange={onChangeClotheSortOption}
              >
                {clotheSortOptionValues.map((sortOption) => (
                  <option key={sortOption} value={sortOption}>
                    {startCase(sortOption)}
                  </option>
                ))}
              </select>
            </Option>
          )}
        </OptionsContainer>
      </Container>
      <ContainerOffset />
    </>
  );
};
