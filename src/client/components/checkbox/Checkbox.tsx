import { ChangeEventHandler, ReactElement } from 'react';
import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
} from './Checkbox.styles';

interface Props {
  checked: boolean;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = ({ checked, onChange, value }: Props): ReactElement => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} value={value} onChange={onChange} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox='0 0 24 24'>
        <polyline points='20 6 9 17 4 12' />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);
