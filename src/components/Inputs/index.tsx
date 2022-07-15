import styled from "styled-components";
import { typeScale } from "../../utils";

export const TextField = styled.input`
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

const Label = styled.label`
  font-size: ${typeScale.header5};
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem 0rem;
`;

interface TextFieldWithLabelProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextFieldWithLabel = (props: TextFieldWithLabelProps) => {
  return (
    <Label>
      {props.label}
      <TextField
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </Label>
  );
};
