import styled from "styled-components";
import { H1 } from "../Headings";
import emptyImage from "../../assets/empty.svg";
import { Image } from "../Image";
import { Button, ButtonWithIcon } from "../Buttons";
import { FaArrowLeft } from "react-icons/fa";
import { Paragraph } from "../Paragraphs";

const MainContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.tertiaryColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
`;

interface EmptyStateProps {
  title: string;
  subtitle: string;
  // btnText: string;
}

export const EmptyState = (props: EmptyStateProps) => {
  return (
    <MainContainer>
      <Image src={emptyImage} width="200px" height="auto" />
      <H1 alignMobile="center" sizeMobile="1.4rem">
        {props.title}
      </H1>
      <Paragraph
        weight="bold"
        color="light"
        align="center"
        alignMobile="center"
      >
        {props.subtitle}
      </Paragraph>
      {/* <Button variants="secondary">{props.btnText}</Button> */}
    </MainContainer>
  );
};
