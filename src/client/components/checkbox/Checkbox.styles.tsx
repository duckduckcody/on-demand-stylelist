import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(p) => (p.checked ? `${p.theme.highlight}` : 'papayawhip')};
  border-radius: 60px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;
