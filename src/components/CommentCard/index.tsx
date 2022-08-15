import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import { CreatorCard } from "../Creator";
import { H6 } from "../Headings";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

interface CommentCardProps {
  comment: any;
  pin?: any;
  onDelete?: () => void;
}
export const CommentCard = (props: CommentCardProps) => {
  const { userData } = useAppSelector((state) => state.user);
  const isCurrentUser = userData._id === props.comment.createdBy._id;
  const isCreator = userData._id === props.pin.createdBy._id;

  const commentCreationDate = new Date(props.comment.createdAt)
    .toLocaleString()
    .slice(0, -3);

  return (
    <MainContainer>
      <CreatorCard
        username={`@${props.comment.createdBy.username}`}
        variant="comment-card"
        subtitle={props.comment.text}
        avatar={
          props.comment.createdBy.avatar
            ? props.comment.createdBy.avatar.url
            : null
        }
        buttonText={""}
      />
      <BottomContainer>
        <H6>{commentCreationDate}</H6>
        {(isCurrentUser || isCreator) && (
          <FaTrashAlt onClick={props.onDelete} />
        )}
      </BottomContainer>
    </MainContainer>
  );
};
