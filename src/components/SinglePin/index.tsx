import { useEffect, useState } from "react";
import { FaArrowDown, FaChevronDown, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  useCreateBoardMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useFetchMeQuery,
  useFollowUserMutation,
  useGetAllBoardsQuery,
  useGetAllCommentsOfPinQuery,
  useRemovePinMutation,
  useSavePinMutation,
  useUnfollowUserMutation,
} from "../../store/services/api-slice";
import { isFollowing } from "../../utils/utilFunctions";
import { AddCommentCard } from "../AddCommentCard";
import { Button, ButtonWithIcon } from "../Buttons";
import { CommentCard } from "../CommentCard";
import { CreatorCard } from "../Creator";
import { H1, H3, H4 } from "../Headings";
import { Image } from "../Image";
import { TextField } from "../Inputs";
import { Modal } from "../Modal";
import { Paragraph } from "../Paragraphs";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 80%;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.tertiaryColor};
  /* padding: 1rem; */
  border-radius: 10px;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    justify-content: center;
  }
`;

const ImageContainer = styled.div``;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 0.5rem;
`;

const TopButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
  @media (max-width: 800px) {
    align-items: center;
    justify-content: center;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 60%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const CommentButtonContainer = styled.div`
  display: flex;
  @media (max-width: 800px) {
    justify-content: center;
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

interface SinglePinProps {
  pin?: any;
}
export const SinglePin = (props: SinglePinProps) => {
  const [showSelectBoard, setShowSelectBoard] = useState(false);
  const [boardName, setBoardName] = useState<any>(null);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);

  const [savePin, { isSuccess: pinSaved }] = useSavePinMutation();
  const [removePin, { isSuccess: pinRemoved }] = useRemovePinMutation();
  const { data, isLoading: isLoadingBoards } = useGetAllBoardsQuery();
  const [createBoard] = useCreateBoardMutation();

  const { data: userData, isLoading: loadingUser } = useFetchMeQuery();
  const [follow, { isLoading: isLoadingFollowing }] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  const { data: AllComments } = useGetAllCommentsOfPinQuery(props.pin._id);

  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  console.log(AllComments);

  const followingArray = userData?.data?.following;

  useEffect(() => {
    if (!isLoadingBoards && data) {
      if (selectedBoard) {
        setSelectedBoard(
          data.data.find((board: any) => board._id === selectedBoard._id)
        );
      }
    }
  }, [data, selectedBoard, isLoadingBoards]);

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

  if (isLoadingBoards) return <div>Loading...</div>;
  return (
    <MainContainer>
      {showSelectBoard && (
        <Modal>
          <BoardsListingCotainer>
            <BoardsContainer>
              {data?.data?.map((board: any) => (
                <BoardBox
                  onClick={() => {
                    setSelectedBoard(board);
                    setShowSelectBoard(false);
                  }}
                >
                  <Image
                    width="40px"
                    height="40px"
                    src="https://picsum.photos/200"
                  />
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
          </BoardsListingCotainer>
        </Modal>
      )}
      <ImageContainer>
        <Image src={props.pin.image.url} width="300px" height="auto" />
      </ImageContainer>

      <LeftContainer>
        <TopButtonContainer>
          <ButtonWithIcon
            variants="transparent"
            size="regular"
            onClick={() => {
              setShowSelectBoard(true);
            }}
          >
            {selectedBoard ? selectedBoard.name : "Select Board"}
            <FaChevronDown />
          </ButtonWithIcon>
          <Button
            variants="primary"
            size="regular"
            onClick={() => {
              if (selectedBoard.pins.includes(props.pin._id)) {
                removePin({ pinId: props.pin._id, boardId: selectedBoard._id });
              } else {
                savePin({
                  pinId: props.pin._id,
                  boardId: selectedBoard?._id,
                });
              }
            }}
          >
            {selectedBoard && selectedBoard.pins.includes(props.pin._id)
              ? "Remove"
              : "Save"}
          </Button>
        </TopButtonContainer>
        <H1 sizeMobile="1.2rem" alignMobile="center">
          {props.pin.name}
        </H1>
        <H4 sizeMobile="0.8rem" alignMobile="center">
          {props.pin.description}
        </H4>
        <CreatorCard
          variant="single-pin"
          avatar={""}
          username={`@${props.pin.createdBy.username}`}
          subtitle={""}
          buttonText={
            userData?.data?._id === props.pin.createdBy._id
              ? "It is you"
              : "Follow"
          }
          buttonVariant="primary"
          onClick={() => {
            if (!isFollowing(props.pin._id, followingArray)) {
              follow({ id: props.pin._id });
            } else {
              unfollow({ id: props.pin._id });
            }
          }}
        />
        <CommentContainer>
          <CommentButtonContainer>
            <ButtonWithIcon variants="tertiary">
              {AllComments?.data?.length} Comments
              <FaArrowDown />
            </ButtonWithIcon>
          </CommentButtonContainer>
          {AllComments?.data?.map((comment: any) => (
            <CommentCard
              comment={comment}
              onDelete={() => {
                deleteComment(comment._id);
              }}
              key={comment}
            />
          ))}
          <AddCommentCard
            commentText="hello"
            onChange={(e) => {
              console.log(e.target.value);
            }}
            onSubmit={() => {
              createComment({
                text: "hello",
                pinId: props.pin._id,
                createdBy: userData?.data?._id,
              });
            }}
          />
          <Button variants="secondary" size="small">
            View All Comments
          </Button>
        </CommentContainer>
      </LeftContainer>
    </MainContainer>
  );
};
