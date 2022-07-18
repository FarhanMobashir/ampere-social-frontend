import { FaEnvelope } from "react-icons/fa";
import styled from "styled-components";
import { typeScale } from "../../utils";
import { Paragraph } from "../Paragraphs";

interface TextFieldProps {
  noBorder?: boolean;
}

export const TextField = styled.input<TextFieldProps>`
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
  ${({ noBorder }) =>
    noBorder &&
    `
    border: none;
    outline: none;
    `}
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

const TextFieldContainer = styled.div`
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.textColorLight};
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
`;
interface TextFieldWithLabelProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  infoText?: string;
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextFieldWithLabel = (props: TextFieldWithLabelProps) => {
  return (
    <Label>
      {props.label}
      <TextFieldContainer>
        <TextField
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          noBorder={true}
        />
        {props.icon}
      </TextFieldContainer>
      {props.infoText && <Paragraph>{props.infoText}</Paragraph>}
    </Label>
  );
};
