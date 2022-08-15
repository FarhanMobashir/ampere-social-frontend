import styled from "styled-components";
import { ButtonWithIcon } from "../Buttons";
import { TextField } from "../Inputs";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

interface AvatarProps {
  size?: "small" | "regular";
}

interface AddCommentProps {
  onSubmit: () => void;
  commentText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const AddCommentCard = (props: AddCommentProps) => {
  return (
    <MainContainer>
      <TextField
        placeholder="Add a comment"
        value={props.commentText}
        onChange={props.onChange}
      />
      <ButtonWithIcon variants="primary" size="small" onClick={props.onSubmit}>
        Comment
      </ButtonWithIcon>
    </MainContainer>
  );
};
