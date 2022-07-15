import styled from "styled-components";
import { H4, H6 } from "../Headings";
import { Image } from "../Image";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const BoardCard = () => {
  return (
    <MainContainer>
      <ImageContainer>
        <Image
          src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
          width="10rem"
          height="8rem"
        />
        <RightContainer>
          <Image
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
            width="5rem"
            height="4rem"
          />
          <Image
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
            width="5rem"
            height="4rem"
          />
        </RightContainer>
      </ImageContainer>
      <H4 weight="bold" weightMobile="bold">
        All Pins
      </H4>
      <BottomContainer>
        <H6 weight="bold" weightMobile="bold" color="light">
          234 Pins
        </H6>
        <H6 weight="bold" weightMobile="bold" color="light">
          2W
        </H6>
      </BottomContainer>
    </MainContainer>
  );
};
