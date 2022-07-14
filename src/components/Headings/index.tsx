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
  font-size: ${(props) => HandleFontSize(props.size)};
  font-weight: ${(props) => handleWeight(props.weight)};
  text-align: ${(props) => handleAlign(props.align)};
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};

  @media (max-width: 800px) {
    font-size: ${(props) => HandleFontSize(props.sizeMobile)};
    font-weight: ${(props) => handleWeight(props.weightMobile)};
    text-align: ${(props) => handleAlign(props.alignMobile)};
  }
`;

export const H2 = styled.h2<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props.size)};
  font-weight: ${(props) => handleWeight(props.weight)};
  text-align: ${(props) => handleAlign(props.align)};

  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};
  @media (max-width: 800px) {
    font-size: ${(props) => HandleFontSize(props.sizeMobile)};
    font-weight: ${(props) => handleWeight(props.weightMobile)};
    text-align: ${(props) => handleAlign(props.alignMobile)};
  }
`;

export const H3 = styled.h3<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props.size)};
  font-weight: ${(props) => handleWeight(props.weight)};
  text-align: ${(props) => handleAlign(props.align)};
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};

  @media (max-width: 800px) {
    font-size: ${(props) => HandleFontSize(props.sizeMobile)};
    font-weight: ${(props) => handleWeight(props.weightMobile)};
    text-align: ${(props) => handleAlign(props.alignMobile)};
  }
`;

export const H4 = styled.h4<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props.size)};
  font-weight: ${(props) => handleWeight(props.weight)};
  text-align: ${(props) => handleAlign(props.align)};
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};

  @media (max-width: 800px) {
    font-size: ${(props) => HandleFontSize(props.sizeMobile)};
    font-weight: ${(props) => handleWeight(props.weightMobile)};
    text-align: ${(props) => handleAlign(props.alignMobile)};
  }
`;

export const H5 = styled.h5<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props.size)};
  font-weight: ${(props) => handleWeight(props.weight)};
  text-align: ${(props) => handleAlign(props.align)};
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};

  @media (max-width: 800px) {
    font-size: ${(props) => HandleFontSize(props.sizeMobile)};
    font-weight: ${(props) => handleWeight(props.weightMobile)};
    text-align: ${(props) => handleAlign(props.alignMobile)};
  }
`;

export const H6 = styled.h6<HeadingProps>`
  font-size: ${(props) => HandleFontSize(props.size)};
  font-weight: ${(props) => handleWeight(props.weight)};
  color: ${(props) => props.theme.primaryColor};
  text-align: ${(props) => handleAlign(props.align)};
  margin: 0;
  padding: 0;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: 2px;
  line-height: 1.5;
  color: ${(props) =>
    props.color === "primary"
      ? props.theme.primaryColor
      : props.theme.textColor};

  @media (max-width: 800px) {
    font-size: ${(props) => HandleFontSize(props.sizeMobile)};
    font-weight: ${(props) => handleWeight(props.weightMobile)};
    text-align: ${(props) => handleAlign(props.alignMobile)};
  }
`;
