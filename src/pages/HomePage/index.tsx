import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button, ButtonWithIcon } from "../../components/Buttons";
import { Image } from "../../components/Image";
import { TextField } from "../../components/Inputs";
import { MasonryGrid } from "../../components/MasonryGrid";
import { Modal } from "../../components/Modal";
import { OnboardingModal } from "../../components/OnboardingModal";
import { Paragraph } from "../../components/Paragraphs";
import { PinCard } from "../../components/PinCard";
import { setHasOnboarded } from "../../store/features/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  useCreateBoardMutation,
  useFetchMeQuery,
  useGetAllBoardsQuery,
  useGetAllPinsQuery,
  useRemovePinMutation,
  useSavePinMutation,
} from "../../store/services/api-slice";

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PinListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media (min-width: 360px) {
    justify-content: flex-start;
    /* align-items: center; */
    padding: 1rem;
  }
`;

const BoardsListingCotainer = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${(props) => props.theme.bgColor};

  border-radius: 10px;
  padding: 1rem;
`;

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  overflow-y: scroll;
`;

const BoardBox = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  /* border-bottom: 2px dashed ${(props) => props.theme.textColorLight}; */
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.lightBgColor};
    transition: cubic-bezier(1, 0, 0, 1) 0.3s;
  }
`;

const TextFieldContainer = styled.div``;

export const Homepage = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const onBoardingState = useAppSelector((state) => state.user.hasOnBoarded);
  const [showOnboardingModal, setShowOnboardingModal] = useState(true);
  const dispatch = useAppDispatch();

  const [showSelectBoard, setShowSelectBoard] = useState(false);
  const [boardName, setBoardName] = useState<any>(null);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);

  const [savePin, { isSuccess: pinSaved }] = useSavePinMutation();
  const [removePin, { isSuccess: pinRemoved }] = useRemovePinMutation();
  const { data: allBoards, isLoading: isLoadingBoards } =
    useGetAllBoardsQuery();
  const [createBoard] = useCreateBoardMutation();

  const { data } = useGetAllPinsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingBoards && allBoards) {
      if (selectedBoard) {
        setSelectedBoard(
          allBoards.data.find((board: any) => board._id === selectedBoard._id)
        );
      }
    }
  }, [allBoards, selectedBoard]);

  useEffect(() => {
    if (pinSaved) {
      toast("Pin saved successfully", {
        type: "success",
        autoClose: 2000,
      });
    }
  }, [pinSaved]);

  useEffect(() => {
    if (pinRemoved) {
      toast("Pin removed successfully", {
        type: "success",
        autoClose: 2000,
      });
    }
  }, [pinRemoved]);

  return (
    <MainContainer>
      {showSelectBoard && (
        <Modal>
          <BoardsListingCotainer>
            <BoardsContainer>
              {allBoards?.data
                ?.slice()
                .reverse()
                .map((board: any) => (
                  <BoardBox
                    onClick={() => {
                      setSelectedBoard(board);
                      setShowSelectBoard(false);
                    }}
                  >
                    <Paragraph weight="bold">
                      {board.name.length > 15
                        ? `${board.name.substring(0, 15)}...`
                        : board.name}
                    </Paragraph>
                  </BoardBox>
                ))}
              {data?.data?.length === 0 && (
                <Paragraph>You don't have any boards yet.</Paragraph>
              )}
            </BoardsContainer>
            <TextFieldContainer>
              <TextField
                placeholder="Enter board name"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
            </TextFieldContainer>
            <ButtonWithIcon
              variants="secondary"
              onClick={() => {
                if (boardName) {
                  createBoard({ name: boardName });
                }
              }}
            >
              Create a new board
              <FaPlus size={20} />
            </ButtonWithIcon>
            <Button
              variants="tertiary"
              onClick={() => {
                setShowSelectBoard(false);
              }}
            >
              Cancel
            </Button>
          </BoardsListingCotainer>
        </Modal>
      )}

      <PinListingContainer>
        {data?.data.map((i: any) => {
          return (
            <PinCard
              key={i._id}
              name={i.name}
              creatorName={`@${i.createdBy.username}`}
              variant="normal"
              image={i.image.url}
              onClick={() => {
                navigate(`/home/pins/${i._id}`);
              }}
              onSave={() => {
                if (selectedBoard.pins.includes(i._id)) {
                  removePin({ pinId: i._id, boardId: selectedBoard._id });
                } else {
                  savePin({
                    pinId: i._id,
                    boardId: selectedBoard?._id,
                  });
                }
              }}
              selectedBoard={
                selectedBoard ? selectedBoard.name : "Select board"
              }
              onSelectBoard={() => {
                setShowSelectBoard(true);
              }}
              btnText={selectedBoard?.pins.includes(i._id) ? "Remove" : "Save"}
              avatar={i.createdBy.avatar ? i.createdBy.avatar.url : null}
            />
          );
        })}
      </PinListingContainer>
      {mode === "signup" && showOnboardingModal && !onBoardingState && (
        <Modal>
          <OnboardingModal
            onClose={() => {
              dispatch(setHasOnboarded(true));
            }}
          />
        </Modal>
      )}
    </MainContainer>
  );
};
