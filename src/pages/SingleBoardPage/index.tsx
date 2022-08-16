import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button, ButtonWithIcon } from "../../components/Buttons";
import { EmptyState } from "../../components/EmptyState";
import { H1, H2, H3, H6 } from "../../components/Headings";
import { TextField, TextFieldWithLabel } from "../../components/Inputs";
import { Loader } from "../../components/Loader";
import { Modal } from "../../components/Modal";
import { Paragraph } from "../../components/Paragraphs";
import { PinCard } from "../../components/PinCard";
import { useAppSelector } from "../../store/hooks";
import {
  useCreateBoardMutation,
  useDeleteSingleBoardMutation,
  useGetAllBoardsQuery,
  useGetSingleBoardQuery,
  useRemovePinMutation,
  useSavePinMutation,
  useUpdateBoardMutation,
} from "../../store/services/api-slice";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const PinListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-self: flex-start;
  @media (max-width: 768px) {
    align-self: center;
    gap: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.lightBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const EditBoardModalContainer = styled.div`
  background-color: ${(props) => props.theme.lightBgColor};
  padding: 2rem;
  border-radius: 10px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0rem;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

export const SingleBoardPage = () => {
  const { id } = useParams();
  const { userData } = useAppSelector((state) => state.user);

  const { data } = useGetSingleBoardQuery(id);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [showDeleteBoard, setShowDeleteBoard] = useState(false);
  const [editBoardName, setEditBoardName] = useState("");
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteSingleBoardMutation();
  const [showSelectBoard, setShowSelectBoard] = useState(false);
  const [boardName, setBoardName] = useState<any>(null);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);

  const [savePin, { isSuccess: pinSaved }] = useSavePinMutation();
  const [removePin, { isSuccess: pinRemoved }] = useRemovePinMutation();
  const { data: allBoards, isLoading: isLoadingBoards } =
    useGetAllBoardsQuery();
  const [createBoard] = useCreateBoardMutation();
  const isCurrentUser = data?.data?.createdBy === userData?._id;

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

  if (isLoadingBoards) {
    return <Loader />;
  }

  return (
    <MainContainer>
      {(showEditBoard || showDeleteBoard) && (
        <Modal>
          <EditBoardModalContainer>
            {showEditBoard && (
              <>
                <H2>Edit Board</H2>
                <TextFieldWithLabel
                  placeholder="Edit board name"
                  label="Edit name"
                  value={editBoardName}
                  onChange={(e) => setEditBoardName(e.target.value)}
                />
                <ModalButtonContainer>
                  <Button
                    variants="primary"
                    onClick={() => {
                      updateBoard({
                        id,
                        data: {
                          name: editBoardName,
                        },
                      });
                      setShowEditBoard(false);
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variants="secondary"
                    onClick={() => setShowEditBoard(false)}
                  >
                    Close
                  </Button>
                </ModalButtonContainer>
              </>
            )}
            {showDeleteBoard && (
              <>
                <H2>Are you sure ?</H2>
                <ModalButtonContainer>
                  <Button
                    variants="primary"
                    onClick={() => {
                      deleteBoard(id);
                      navigate("/home/user");
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variants="secondary"
                    onClick={() => setShowDeleteBoard(false)}
                  >
                    Close
                  </Button>
                </ModalButtonContainer>
              </>
            )}
          </EditBoardModalContainer>
        </Modal>
      )}
      <H1>{data?.data?.name}</H1>
      {isCurrentUser && (
        <ButtonContainer>
          <IconBox>
            <IconButtonContainer
              onClick={() => {
                setEditBoardName(data?.data?.name);
                setShowEditBoard(true);
              }}
            >
              <FaEdit />
            </IconButtonContainer>
            <H6 weight="bold" weightMobile="bold">
              Edit
            </H6>
          </IconBox>

          <IconBox>
            <IconButtonContainer
              onClick={() => {
                setShowDeleteBoard(true);
              }}
            >
              <FaTrash />
            </IconButtonContainer>
            <H6 weight="bold" weightMobile="bold">
              Delete
            </H6>
          </IconBox>
        </ButtonContainer>
      )}
      <PinListingContainer>
        {showSelectBoard && (
          <Modal>
            <BoardsListingCotainer>
              <BoardsContainer>
                {allBoards?.data?.map((board: any) => (
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
        {data?.data?.pins.map((i: any) => (
          <PinCard
            name={i.name}
            creatorName={`@${i.createdBy.username}`}
            variant={isCurrentUser ? "boardVariant" : "normal"}
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
            selectedBoard={selectedBoard ? selectedBoard.name : "Select board"}
            onSelectBoard={() => {
              setShowSelectBoard(true);
            }}
            btnText={selectedBoard?.pins.includes(i._id) ? "Remove" : "Save"}
            onRemove={() => {
              removePin({ pinId: i._id, boardId: id });
            }}
            avatar={i.createdBy.avatar ? i.createdBy.avatar.url : null}
          />
        ))}
      </PinListingContainer>
      {data?.data?.pins.length === 0 && (
        <EmptyStateContainer>
          <EmptyState
            title="No pins yet"
            subtitle={
              isCurrentUser ? "Add a pin to get started" : "This board is empty"
            }
          />
        </EmptyStateContainer>
      )}
    </MainContainer>
  );
};
