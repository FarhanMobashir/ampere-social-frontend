import { neutral, primaryColor } from "./colors";

export const defaultTheme = {
  buttonColor: neutral[100],
  buttonBgColor: primaryColor[500],
  buttonGradient:
    "linear-gradient(to right, #732FC6 0%, #d0454c 51%, #8849D4 100%);",
  bgColor: neutral[100],
  textColor: neutral[900],
  textColorLight: neutral[400],
  lightBgColor: neutral[300],
};

export const darkTheme = {
  buttonColor: neutral[100],
  buttonBgColor: primaryColor[600],
  buttonGradient:
    "linear-gradient(to right, #732FC6 0%, #9E6ADC 51%, #8849D4 100%);",
  bgColor: neutral[900],
  textColor: neutral[100],
  lightBgColor: neutral[400],
  textColorLight: neutral[400],
};
