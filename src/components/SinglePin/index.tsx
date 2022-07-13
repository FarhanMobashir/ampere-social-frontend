import { FaArrowDown } from "react-icons/fa";
import styled from "styled-components";
import { Button, ButtonWithIcon } from "../Buttons";
import { Image } from "../Image";

const MainContainer = styled.div`
  display: flex;
`;

const ImageContainer = styled.div``;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
`;

export const SinglePin = () => {
  return (
    <MainContainer>
      <ImageContainer>
        <Image
          src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
          width="300px"
          height="auto"
        />
      </ImageContainer>

      <LeftContainer>
        <TopButtonContainer>
          <ButtonWithIcon variants="transparent" size="regular">
            men-out... <FaArrowDown />
          </ButtonWithIcon>
          <Button variants="primary" size="regular">
            Save
          </Button>
        </TopButtonContainer>
      </LeftContainer>
    </MainContainer>
  );
};
