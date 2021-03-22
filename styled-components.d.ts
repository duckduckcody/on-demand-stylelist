import { CustomTheme } from './src/themes';

declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends CustomTheme {}
}
