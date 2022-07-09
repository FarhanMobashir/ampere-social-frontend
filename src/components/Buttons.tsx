import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.buttonBgColor};
  color: ${(props) => props.theme.buttonColor};
  border: none;
  border-radius: 50px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
