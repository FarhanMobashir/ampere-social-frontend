import { createGlobalStyle } from "styled-components";
import { primaryFont } from "./typography";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0 25%;
  padding: 0;
  font-family: ${primaryFont};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}

@media (max-width:800px) {
  body {
    margin: 0 4%;
  }   
}
`;
