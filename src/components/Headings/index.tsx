import styled from "styled-components";
import {
  handleAlign,
  HandleFontSize,
  handleWeight,
} from "../../helpers/styled-components.helpers";
import { HeadingProps } from "../../types/Headings";

export const H1 = styled.h1<HeadingProps>`
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  font-size: ${(props) => HandleFontSize(props)};
  font-weight: ${(props) => handleWeight(props)};
  text-align: ${(props) => handleAlign(props)};
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};
`;

export const H2 = styled.h2<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props)};
  font-weight: ${(props) => handleWeight(props)};
  color: ${(props) => props.theme.primaryColor};
  text-align: ${(props) => handleAlign(props)};

  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};
`;

export const H3 = styled.h3<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props)};
  font-weight: ${(props) => handleWeight(props)};
  color: ${(props) => props.theme.primaryColor};
  text-align: ${(props) => handleAlign(props)};
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};
`;

export const H4 = styled.h4<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props)};
  font-weight: ${(props) => handleWeight(props)};
  color: ${(props) => props.theme.primaryColor};
  text-align: ${(props) => handleAlign(props)};
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};
`;

export const H5 = styled.h5<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props)};
  font-weight: ${(props) => handleWeight(props)};
  color: ${(props) => props.theme.primaryColor};
  text-align: ${(props) => handleAlign(props)};
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};
`;

export const H6 = styled.h6<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props)};
  font-weight: ${(props) => handleWeight(props)};
  color: ${(props) => props.theme.primaryColor};
  text-align: ${(props) => handleAlign(props)};
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};
`;
