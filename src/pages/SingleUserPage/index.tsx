import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BoardCard } from "../../components/BoardCard";
import { Button, ButtonWithIcon } from "../../components/Buttons";
import { EmptyState } from "../../components/EmptyState";
import { H5 } from "../../components/Headings";
import { TextField } from "../../components/Inputs";
import { Loader } from "../../components/Loader";
import { Modal } from "../../components/Modal";
import { Paragraph } from "../../components/Paragraphs";
import { PinCard } from "../../components/PinCard";
import { ProfileCard } from "../../components/ProfileCard";

import {
  useCreateBoardMutation,
  useGetAllBoardsOfUserQuery,
  useGetAllBoardsQuery,
  useGetAllPinsOfUserQuery,
  useGetSingleUsersQuery,
  useRemovePinMutation,
  useSavePinMutation,
} from "../../store/services/api-slice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

interface TabProps {
  isActive: boolean;
}
const Tab = styled.div<TabProps>`
  border-bottom: ${(props) =>
    props.isActive ? `2px solid ${props.theme.textColor}` : "none"};
  padding: 0.5rem;
  cursor: pointer;
`;

const BoardsListingContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

export const SingleUserPage = () => {
  const { id } = useParams();
  const { data: allBoardsOfUser } = useGetAllBoardsOfUserQuery(id);
  const { data: allPinsCreatedByUser, isLoading } =
    useGetAllPinsOfUserQuery(id);
  const { data: singleUser } = useGetSingleUsersQuery(id);
  const [savePin, { isSuccess: pinSaved }] = useSavePinMutation();
  const [removePin, { isSuccess: pinRemoved }] = useRemovePinMutation();
  const { data: allBoardsOfCurrentUser, isLoading: isLoadingBoards } =
    useGetAllBoardsQuery();
  const [createBoard] = useCreateBoardMutation();

  const [activeTab, setActiveTab] = useState<"created" | "saved">("saved");
  const [showSelectBoard, setShowSelectBoard] = useState(false);
  const [boardName, setBoardName] = useState<any>(null);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingBoards && allBoardsOfCurrentUser) {
      if (selectedBoard) {
        setSelectedBoard(
          allBoardsOfCurrentUser.data.find(
            (board: any) => board._id === selectedBoard._id
          )
        );
      }
    }
  }, [allBoardsOfCurrentUser, selectedBoard]);

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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      {showSelectBoard && (
        <Modal>
          <BoardsListingCotainer>
            <BoardsContainer>
              {allBoardsOfCurrentUser?.data?.map((board: any) => (
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
              {allBoardsOfCurrentUser?.data?.length === 0 && (
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
      <ProfileCard
        username={`@${singleUser?.data.username}`}
        bio={singleUser?.data.bio}
        followers={singleUser?.data.followers.length}
        following={singleUser?.data.following.length}
        type="creator"
        avatar={singleUser?.data.avatar ? singleUser?.data.avatar.url : null}
      />
      <TabsContainer>
        <Tab
          isActive={activeTab === "created"}
          onClick={() => {
            setActiveTab("created");
          }}
        >
          <H5 weight="bold">Created</H5>
        </Tab>
        <Tab
          isActive={activeTab === "saved"}
          onClick={() => {
            setActiveTab("saved");
          }}
        >
          <H5 weight="bold">Saved</H5>
        </Tab>
      </TabsContainer>
      <BoardsListingContainer>
        {activeTab === "saved" &&
          allBoardsOfUser?.data?.map((item: any) => (
            <BoardCard
              board={item}
              key={item}
              onClick={() => {
                navigate(`/home/boards/${item._id}`);
              }}
            />
          ))}
        {activeTab === "created" &&
          allPinsCreatedByUser?.data?.map((i: any) => (
            <PinCard
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
              avatar={i.createdBy.avatar.url || null}
            />
          ))}
        {activeTab === "created" && allPinsCreatedByUser?.data?.length === 0 && (
          <EmptyState
            title="This user hasn't created any pins yet"
            subtitle="
            Pins created by this user will be shown here"
          />
        )}
        {activeTab === "saved" && allBoardsOfUser?.data?.length === 0 && (
          <EmptyState
            title="This user hasn't saved any pins yet"
            subtitle="Boards created by this user will be shown here"
          />
        )}
      </BoardsListingContainer>
    </Container>
  );
};
