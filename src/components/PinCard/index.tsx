import { FaArrowAltCircleDown, FaArrowDown, FaEllipsisH } from "react-icons/fa";
import styled from "styled-components";
import { Button, ButtonWithIcon, IconButton } from "../Buttons";
import { H2, H3, H4, H6 } from "../Headings";
import { Image } from "../Image";

const PinContainer = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
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

const CreatorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PinCard = () => {
  return (
    <PinContainer>
      <PinImageContainer>
        <ImageContainer>
          <Image
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
            width="100%"
            height="auto"
          />
        </ImageContainer>
        <SelectPinContainer>
          <ButtonWithIcon variants="transparent" size="small">
            men-out... <FaArrowDown />
          </ButtonWithIcon>
        </SelectPinContainer>
        <SaveButtonContainer>
          <Button variants="tertiary" size="small">
            Save
          </Button>
        </SaveButtonContainer>
      </PinImageContainer>
      <BottomContainer>
        <H3 weight="bold" uppercase={false}>
          Tee Outfit
        </H3>
        <CreatorSection>
          <Image
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
            height="30px"
            width="30px"
            type="circle"
          />
          <H4>The Indian Gen...</H4>
        </CreatorSection>
      </BottomContainer>
    </PinContainer>
  );
};
