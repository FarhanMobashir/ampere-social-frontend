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
  justify-content: space-around;
  gap: 2rem;
  width: 90%;
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

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

  const [createComment, { isLoading: isAddingComment }] =
    useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [comment, setComment] = useState<any>(null);

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

  useEffect(() => {
    if (!isAddingComment) {
      setComment("");
    }
  }, [isAddingComment]);

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
      <ImageContainer>
        <Image src={props.pin.image.url} width="300px" height="auto" />
      </ImageContainer>

      <RightContainer>
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
          avatar={
            props.pin.createdBy.avatar ? props.pin.createdBy.avatar.url : null
          }
          username={`@${props.pin.createdBy.username}`}
          subtitle={""}
          buttonText={
            userData?.data?._id === props.pin.createdBy._id
              ? "It is you"
              : userData?.data?.following.includes(props.pin.createdBy._id)
              ? "Unfollow"
              : "Follow"
          }
          buttonVariant="primary"
          onClick={() => {
            if (!isFollowing(props.pin.createdBy._id, followingArray)) {
              follow({ id: props.pin.createdBy._id });
            }
            if (userData?.data?._id === props.pin.createdBy._id) {
              return;
            }
            if (isFollowing(props.pin.createdBy._id, followingArray)) {
              unfollow({ id: props.pin.createdBy._id });
            }
          }}
          link={`/home/user/${props.pin.createdBy._id}`}
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
              key={comment._id}
              pin={props.pin}
            />
          ))}
          <AddCommentCard
            commentText={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            onSubmit={() => {
              createComment({
                text: comment,
                pinId: props.pin._id,
                createdBy: userData?.data?._id,
              });
            }}
          />
        </CommentContainer>
      </RightContainer>
    </MainContainer>
  );
};
