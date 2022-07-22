import styled from "styled-components";
import { H4, H6 } from "../Headings";
import { Image } from "../Image";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
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

interface BoardCardProps {
  board?: any;
}

export const BoardCard = (props: BoardCardProps) => {
  return (
    <MainContainer>
      <ImageContainer>
        <Image
          src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
          width="10rem"
          height="8rem"
          widthMobile="6rem"
          heightMobile="5rem"
        />
        <RightContainer>
          <Image
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
            width="5rem"
            height="4rem"
            widthMobile="3rem"
            heightMobile="2.5rem"
          />
          <Image
            src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
            width="5rem"
            height="4rem"
            widthMobile="3rem"
            heightMobile="2.5rem"
          />
        </RightContainer>
      </ImageContainer>
      <H4 weight="bold" weightMobile="bold">
        {props.board.name.length > 15
          ? props.board.name.substring(0, 15) + "..."
          : props.board.name}
      </H4>
      <BottomContainer>
        <H6 weight="bold" weightMobile="bold" color="light">
          {props.board.pins.length} Pins
        </H6>
        <H6 weight="bold" weightMobile="bold" color="light">
          2W
        </H6>
      </BottomContainer>
    </MainContainer>
  );
};
