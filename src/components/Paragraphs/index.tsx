import styled from "styled-components";
import {
  handleAlign,
  HandleFontSize,
  handleWeight,
} from "../../helpers/styled-components.helpers";
import { ParagraphProps } from "../../types/Paragraph";

export const Paragraph = styled.p<ParagraphProps>`
  font-size: 14px;
  line-height: 1.3;
  margin: 0;
  padding: 0;
  font-size: ${(props) => HandleFontSize(props.size)};
  font-weight: ${(props) => handleWeight(props.weight)};
  color: ${(props) => {
    switch (props.color) {
      case "dark":
        return props.theme.textColor;
      case "light":
        return props.theme.textColorLight;
      default:
        return props.theme.textColor;
    }
  }};
  text-align: ${(props) => handleAlign(props.align)};
`;
