import styled from "styled-components";
import { Button } from "../Buttons";
import { H5, H6 } from "../Headings";
import { Image } from "../Image";
import { Paragraph } from "../Paragraphs";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreatorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

interface CreatorCardProps {
  variant: "pin-card" | "single-pin" | "comment-card";
  avatar?: string;
  username?: string;
  subtitle?: string;
}

export const CreatorCard = (props: CreatorCardProps) => {
  return (
    <MainContainer>
      <CreatorSection>
        <Image
          src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
          height={props.variant === "single-pin" ? "50px" : "35px"}
          width={props.variant === "single-pin" ? "50px" : "35px"}
          type="circle"
        />
        <ContentContainer>
          {props.variant === "single-pin" ? (
            <H5 weight="bold">{props.username || "The Indian Gen..."}</H5>
          ) : (
            <H6 weight="bold">{props.username || "The Indian Gen..."}</H6>
          )}
          {props.variant !== "pin-card" && (
            <Paragraph weight="bold" color="light">
              {props.subtitle || "10 Followers"}
            </Paragraph>
          )}
        </ContentContainer>
      </CreatorSection>
      {props.variant === "single-pin" && (
        <Button variants="tertiary" size="small">
          Follow
        </Button>
      )}
    </MainContainer>
  );
};
