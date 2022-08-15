import styled from "styled-components";
import { H4, H6 } from "../Headings";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
  cursor: pointer;
  padding: 2rem;
  border: 4px solid ${({ theme }) => theme.tertiaryColor};
  border-radius: 1rem;
`;

const BottomContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

interface BoardCardProps {
  board?: any;
  onClick?: () => void;
}

export const BoardCard = (props: BoardCardProps) => {
  return (
    <MainContainer onClick={props.onClick}>
      <H4 weight="bold" weightMobile="bold">
        {props.board.name.length > 15
          ? props.board.name.substring(0, 15) + "..."
          : props.board.name}
      </H4>
      <BottomContainer>
        <H6 weight="bold" weightMobile="bold" color="light">
          {props.board.pins.length} Pins
        </H6>
        {/* <H6 weight="bold" weightMobile="bold" color="light">
          2W
        </H6> */}
      </BottomContainer>
    </MainContainer>
  );
};
