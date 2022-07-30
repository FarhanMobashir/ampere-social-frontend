import styled from "styled-components";
import { Button } from "../Buttons";
import { CustomLink } from "../CustomLink";
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

interface AvatarProps {
  size?: "small" | "regular";
}
const Avatar = styled.div<AvatarProps>`
  width: ${(props) => (props.size === "small" ? "30px" : "40px")};
  height: ${(props) => (props.size === "small" ? "30px" : "40px")};
  border-radius: 50%;
  background-color: #fcd5db;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColorDark};
  font-size: 1rem;
  font-weight: bold;
`;

interface CreatorCardProps {
  variant: "pin-card" | "single-pin" | "comment-card";
  avatar: string;
  username: string | null;
  subtitle: string;
  buttonText: string;
  onClick?: () => void;
  buttonVariant?: "primary" | "secondary" | "tertiary";
  link?: string | undefined;
}

export const CreatorCard = (props: CreatorCardProps) => {
  return (
    <MainContainer>
      <CreatorSection>
        <CustomLink to={props.link || ""}>
          {props.avatar && (
            <Image
              src={props.avatar}
              height={props.variant === "single-pin" ? "50px" : "35px"}
              width={props.variant === "single-pin" ? "50px" : "35px"}
              type="circle"
            />
          )}
          {!props.avatar && (
            <Avatar
              size={props.variant === "single-pin" ? "regular" : "regular"}
            >
              {props.username && props.username[1].toUpperCase()}
            </Avatar>
          )}
        </CustomLink>
        <ContentContainer>
          {props.variant === "single-pin" ? (
            <H5 weight="bold">{props.username}</H5>
          ) : (
            <H6 weight="bold">{props.username}</H6>
          )}
          {props.variant !== "pin-card" && (
            <Paragraph weight="bold" color="light">
              {props.subtitle}
            </Paragraph>
          )}
        </ContentContainer>
      </CreatorSection>
      {props.variant === "single-pin" && (
        <Button
          variants={props.buttonVariant}
          size="small"
          onClick={props.onClick}
        >
          {props.buttonText}
        </Button>
      )}
    </MainContainer>
  );
};
