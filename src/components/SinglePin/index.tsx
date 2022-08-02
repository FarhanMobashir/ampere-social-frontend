import { useState } from "react";
import { FaArrowDown, FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import {
  useCreateBoardMutation,
  useGetAllBoardsQuery,
  useSavePinMutation,
} from "../../store/services/api-slice";
import { AddCommentCard } from "../AddCommentCard";
import { Button, ButtonWithIcon } from "../Buttons";
import { CommentCard } from "../CommentCard";
import { CreatorCard } from "../Creator";
import { H1, H3, H4 } from "../Headings";
import { Image } from "../Image";
import { Modal } from "../Modal";
import { SelectBoard } from "../SelectBoard";

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

interface SinglePinProps {
  pin?: any;
}
export const SinglePin = (props: SinglePinProps) => {
  const [showSelectBoard, setShowSelectBoard] = useState(false);

  const { data, isLoading: isLoadingBoards } = useGetAllBoardsQuery();
  const [savePin] = useSavePinMutation();

  if (isLoadingBoards) return <div>Loading...</div>;
  return (
    <MainContainer>
      {showSelectBoard && (
        <Modal>
          <SelectBoard
            boards={data?.data}
            onClose={() => {
              setShowSelectBoard(false);
            }}
            pin={props.pin}

          />
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
            Select Board
            <FaChevronDown />
          </ButtonWithIcon>
          <Button
            variants="primary"
            size="regular"
            onClick={() => {
              setShowSelectBoard(true);
            }}
          >
            Save
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
          buttonText={"Follow"}
          buttonVariant="primary"
        />
        <CommentContainer>
          <CommentButtonContainer>
            <ButtonWithIcon variants="tertiary">
              8 Comments
              <FaArrowDown />
            </ButtonWithIcon>
          </CommentButtonContainer>
          {[1].map((comment) => (
            <CommentCard key={comment} />
          ))}
          <AddCommentCard />
          <Button variants="secondary" size="small">
            View All Comments
          </Button>
        </CommentContainer>
      </LeftContainer>
    </MainContainer>
  );
};
