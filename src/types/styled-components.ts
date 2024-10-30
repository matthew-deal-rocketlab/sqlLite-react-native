// styled.d.ts
import 'styled-components';

// import { DefaultTheme } from 'styled-components/native'
import {ThemeType} from '../theme';

// declare module 'styled-components' {
//   export interface DefaultTheme extends ThemeType {} // extends the global DefaultTheme with our ThemeType.
// }

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {} // extends the global DefaultTheme with our ThemeType.
}
