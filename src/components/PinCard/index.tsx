import { useState } from "react";
import {
  FaArrowDown,
  FaChevronDown,
  FaEdit,
  FaEllipsisH,
  FaGripHorizontal,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import styled from "styled-components";
import { useResponsive } from "../../context/ResposiveContext";
import { Button, ButtonWithIcon, IconButton } from "../Buttons";
import { CreatorCard } from "../Creator";
import { CustomLink } from "../CustomLink";
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
  cursor: zoom-in;
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

const BottomFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface PinCardProps {
  variant: "normal" | "more-ideas" | "organise" | "boardVariant" | "created";

  name?: string;
  creatorName?: string | null;
  image?: string;
  onClick?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
  onSave?: () => void;
  onSelectBoard?: () => void;
  selectedBoard?: any;
  btnText?: string;
}

export const PinCard = (props: PinCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { isMobile } = useResponsive();
  return (
    <PinContainer
      onMouseOver={() => {
        if (!isMobile) {
          setIsHovering(true);
        }
      }}
      onMouseOut={() => {
        if (!isMobile) {
          setIsHovering(false);
        }
      }}
    >
      <PinImageContainer>
        <ImageContainer onClick={props.onClick}>
          <Image src={props.image} width="100%" height="200px" />
        </ImageContainer>
        <SelectPinContainer>
          {isHovering && props.variant === "normal" && (
            <ButtonWithIcon
              variants="transparent"
              size="x-small"
              onClick={props.onSelectBoard}
            >
              {props.selectedBoard} <FaChevronDown />
            </ButtonWithIcon>
          )}
        </SelectPinContainer>
        <SaveButtonContainer>
          {isHovering && props.variant === "normal" && (
            <Button variants="primary" size="small" onClick={props.onSave}>
              {props.btnText ? props.btnText : "Save"}
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
            <IconButton variants="tertiary" onClick={props.onRemove}>
              <FaTrashAlt />
            </IconButton>
          )}
          {props.variant === "created" && (
            <IconButton variants="tertiary" onClick={props.onEdit}>
              <FaEdit />
            </IconButton>
          )}
        </SaveButtonContainer>
      </PinImageContainer>
      <BottomContainer>
        <BottomFlexContainer>
          <H4 weight="bold" uppercase={false}>
            {props.name}
          </H4>
          {isMobile && props.variant === "normal" && (
            <FaEllipsisH onClick={() => setIsHovering(!isHovering)} />
          )}
        </BottomFlexContainer>

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
