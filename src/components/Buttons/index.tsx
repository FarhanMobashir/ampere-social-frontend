import styled, { DefaultTheme } from "styled-components";
import { ButtonProps } from "../../types/Buttons";

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 50px;
  padding: 10px 15px;
  font-size: ${(props) => {
    switch (props.size) {
      case "x-small":
        return "10px";
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
                background-color: ${props.theme.primaryColor};
                color: ${props.theme.lightTextColor};
                `;
      case "secondary":
        return `
                background-color: ${props.theme.secondaryColor};
                color: ${props.theme.lightTextColor};
                `;
      case "tertiary":
        return `
                background-color: ${props.theme.tertiaryColor};
                color: ${props.theme.textColorDark};
                `;
      case "transparent":
        return `
                background-color: rgba(0,0,0,0.4);
                padding: 5px;
                color: ${props.theme.lightTextColor};
                `;

      case "disabled":
        return `
                background-color: ${props.theme.disabledColor};
                color: ${props.theme.lightTextColor};
                cursor: not-allowed;
                `;
      default:
        return `background-color: ${props.theme.primaryColor};`;
    }
  }}
`;

export const ButtonWithIconElement = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0.8rem 1.2rem; */
  gap: 0.5rem;
`;

interface ButtonWithIconProps extends ButtonProps {
  children: React.ReactNode;
}

export const ButtonWithIcon = (props: ButtonWithIconProps) => {
  return (
    <ButtonWithIconElement {...props}>{props.children}</ButtonWithIconElement>
  );
};

export const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 0.8rem;
  border-radius: 50%;
  gap: 0.5rem;
`;

const Badge = styled.span`
  background-color: red;
  color: white;
  padding: 0.2rem;
  border-radius: 50%;
  font-size: 0.6rem;
  position: absolute;
  font-weight: bold;
`;

interface IconButtonWithBadgeProps extends ButtonProps {
  children: React.ReactNode;
  badge?: number;
}

export const IconButtonWithBadge = (props: IconButtonWithBadgeProps) => {
  return (
    <IconButton {...props}>
      <Badge>{props.badge}</Badge>
      {props.children}
    </IconButton>
  );
};
