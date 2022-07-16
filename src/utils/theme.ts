import { neutral, primaryColor } from "./colors";

export const defaultTheme = {
  primaryColor: primaryColor[600],
  secondaryColor: neutral[900],
  tertiaryColor: neutral[300],
  buttonGradient:
    "linear-gradient(to right, #732FC6 0%, #d0454c 51%, #8849D4 100%);",
  bgColor: neutral[100],
  textColor: neutral[900],
  lightBgColor: neutral[300],
  lightTextColor: neutral[200],
  textColorLight: neutral[600],
  textColorDark: neutral[800],
};

export const darkTheme = {
  primaryColor: primaryColor[600],
  secondaryColor: neutral[700],
  tertiaryColor: neutral[300],
  buttonGradient:
    "linear-gradient(to right, #732FC6 0%, #9E6ADC 51%, #8849D4 100%);",
  bgColor: neutral[900],
  textColor: neutral[100],
  lightBgColor: neutral[400],
  lightTextColor: neutral[100],
  textColorLight: neutral[400],
  textColorDark: neutral[800],
};
