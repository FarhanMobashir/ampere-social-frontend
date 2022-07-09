// import original module declarations
import "styled-components";
import { defaultTheme } from "./utils";
type theme = typeof defaultTheme;
// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends theme {}
}
