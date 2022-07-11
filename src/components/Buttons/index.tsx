import styled, { DefaultTheme } from "styled-components";

interface ButtonProps {
  size?: "small" | "regular" | "large";
  variants?: "primary" | "secondary" | "tertiary";
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 50px;
  padding: 10px 15px;
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "12px";
      case "regular":
        return "14px";
      case "large":
        return "16px";
      default:
        return "14px";
    }
  }};
  font-weight: bold;
  cursor: pointer;
  ${(props) => {
    switch (props.variants) {
      case "primary":
        return `
                background-color: ${props.theme.primaryColor};`;
      case "secondary":
        return `
                background-color: ${props.theme.secondaryColor};
                color: ${props.theme.lightTextColor};
                `;
      case "tertiary":
        return `
                background-color: ${props.theme.tertiaryColor};
                color: ${props.theme.secondaryColor};
                `;
      default:
        return `
                background-color: ${props.theme.primaryColor};`;
    }
  }}
`;
