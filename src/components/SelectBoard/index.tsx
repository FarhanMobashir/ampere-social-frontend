import { useState } from "react";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";

import {
  useCreateBoardMutation,
  useSavePinMutation,
} from "../../store/services/api-slice";

import { Button, ButtonWithIcon } from "../Buttons";
import { H1, H5 } from "../Headings";
import { Image } from "../Image";
import { TextField } from "../Inputs";

const MainContainer = styled.div`

  background-color: ${({ theme }) => theme.bgColor};

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 10px;
`;
const BoardListingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow-y: scroll;
`;

const CreateBoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const BoardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 0.5rem;
  &:hover {
    border: 1px solid ${({ theme }) => theme.primaryColor};
    cursor: pointer;
  }
`;

interface SelectBoardProps {

  boards: any[];
  onClose: () => void;
  pin: any;

}

export const SelectBoard = (props: SelectBoardProps) => {
  const [boardName, setBoardName] = useState("");

  const [selectedBoard, setSelectedBoard] = useState<any>(null);
  const [createBoard] = useCreateBoardMutation();
  const [savePin] = useSavePinMutation();

  return (
    <MainContainer>
      <H1 align="center">Select Board</H1>
      <BoardListingContainer>
        {props.boards.map((board: any, idx) => (

          <BoardBox onClick={() => setSelectedBoard(board)}>

            <Image
              src="https://picsum.photos/id/1/200/200"
              height="60"
              width="60"
            />
            <H5>{board.name}</H5>
          </BoardBox>
        ))}
      </BoardListingContainer>
      <CreateBoardContainer>
        <ButtonWithIcon
          variants="secondary"
          onClick={() => {
            if (boardName) {
              createBoard({ name: boardName });
            }
          }}
        >
          <FaPlus />
        </ButtonWithIcon>
        <TextField
          placeholder="Enter board name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
      </CreateBoardContainer>
      <BottomContainer>

        <Button
          variants="primary"
          onClick={() => {
            if (selectedBoard) {
              savePin({
                boardId: selectedBoard._id,
                pinId: props.pin._id,
              });
            }
          }}
        >

          Save
        </Button>
        <Button variants="tertiary" onClick={props.onClose}>
          Close
        </Button>
      </BottomContainer>
    </MainContainer>
  );
};
