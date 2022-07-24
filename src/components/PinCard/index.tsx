import { useState } from "react";
import {
  FaArrowDown,
  FaChevronDown,
  FaGripHorizontal,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import styled from "styled-components";
import { Button, ButtonWithIcon, IconButton } from "../Buttons";
import { CreatorCard } from "../Creator";
import { H4, H6 } from "../Headings";
import { Image } from "../Image";

const PinContainer = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const PinImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

const ImageContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 5;
`;

const SaveButtonContainer = styled.div`
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 2;
  align-self: center;
  padding: 0.5rem;
`;

const SelectPinContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  align-self: center;
  padding: 0.4rem;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface PinCardProps {
  variant: "normal" | "more-ideas" | "organise" | "boardVariant";
  name?: string;
  creatorName?: string | null;
}

export const PinCard = (props: PinCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <PinContainer
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <PinImageContainer>
        <ImageContainer>
          <Image
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
            width="100%"
            height="auto"
          />
        </ImageContainer>
        <SelectPinContainer>
          {isHovering && props.variant === "normal" && (
            <ButtonWithIcon variants="transparent" size="x-small">
              men-out... <FaChevronDown />
            </ButtonWithIcon>
          )}
        </SelectPinContainer>
        <SaveButtonContainer>
          {isHovering && props.variant === "normal" && (
            <Button variants="tertiary" size="small">
              Save
            </Button>
          )}
          {props.variant === "more-ideas" && (
            <IconButton variants="tertiary">
              <FaPlus />
            </IconButton>
          )}
          {props.variant === "organise" && (
            <IconButton variants="tertiary">
              <FaGripHorizontal />
            </IconButton>
          )}
          {props.variant === "boardVariant" && (
            <IconButton variants="tertiary">
              <FaTrashAlt />
            </IconButton>
          )}
        </SaveButtonContainer>
      </PinImageContainer>
      <BottomContainer>
        <H4 weight="bold" uppercase={false}>
          {props.name}
        </H4>
        {props.variant === "normal" || props.variant === "more-ideas" ? (
          <CreatorCard
            variant="pin-card"
            avatar={""}
            username={props.creatorName || ""}
            subtitle={""}
            buttonText={""}
          />
        ) : null}
      </BottomContainer>
    </PinContainer>
  );
};
