import { useState } from "react";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";

import {
  useCreateBoardMutation,
  useSavePinMutation,
} from "../../store/services/api-slice";

import { Button, ButtonWithIcon } from "../Buttons";
import { H1, H4, H5 } from "../Headings";
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
  align-items: center;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.lightBgColor};
    transition: cubic-bezier(1, 0, 0, 1) 0.3s;
  }
`;

interface SelectBoardProps {
  boards: any[];
  onClose: () => void;
}

export const SelectBoard = (props: SelectBoardProps) => {
  const [boardName, setBoardName] = useState("");
  const [createBoard] = useCreateBoardMutation();

  return (
    <MainContainer>
      <H1 align="center">Select Board</H1>
      <BoardListingContainer>
        {props.boards.map((board: any, idx) => (
          <BoardBox onClick={() => console.log("select board")}>
            <H4>{board.name}</H4>
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
        <Button variants="tertiary" onClick={props.onClose}>
          Close
        </Button>
      </BottomContainer>
    </MainContainer>
  );
};
