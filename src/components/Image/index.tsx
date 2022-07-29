import styled from "styled-components";
import { ImageProps } from "../../types/Image";

export const Image = styled.img<ImageProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
  transition: all 0.3s ease-in-out;
  /* &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  } */
  ${(props: ImageProps) => {
    switch (props.type) {
      case "square":
        return `border-radius: 0;`;
      case "rounded":
        return `border-radius: 10px;`;
      case "circle":
        return `border-radius: 50%;`;
      default:
        return `border-radius: 5px;`;
    }
  }}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  filter: ${(props) => props.filter};
  @media (max-width: 800px) {
    width: ${(props) => props.widthMobile || props.width};
    height: ${(props) => props.heightMobile || props.height};
  }
`;
