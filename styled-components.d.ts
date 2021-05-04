import { CustomTheme } from './src/client/themes';

declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends CustomTheme {}
}
