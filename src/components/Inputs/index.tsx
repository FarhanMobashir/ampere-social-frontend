import styled from "styled-components";
import { typeScale } from "../../utils";

export const TextFiled = styled.input`
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.textColorLight};
  outline: none;
  font-size: ${typeScale.helperText};
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;
