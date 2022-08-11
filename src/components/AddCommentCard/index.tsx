import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import { ButtonWithIcon } from "../Buttons";
import { Image } from "../Image";
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

const Avatar = styled.div<AvatarProps>`
  width: ${(props) => (props.size === "small" ? "30px" : "40px")};
  height: ${(props) => (props.size === "small" ? "30px" : "40px")};
  border-radius: 50%;
  background-color: #fcd5db;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColorDark};
  font-size: 1rem;
  font-weight: bold;
`;

interface AddCommentProps {
  onSubmit: () => void;
  commentText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const AddCommentCard = (props: AddCommentProps) => {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <MainContainer>
      {userData.avatar && (
        <Image type="circle" height="30px" width="30px" src={userData.avatar} />
      )}
      {!userData.avatar && (
        <Avatar size="regular">{userData.username[0].toUpperCase()}</Avatar>
      )}
      <TextField
        placeholder="Add a comment"
        value={props.commentText}
        onChange={props.onChange}
      />
      <ButtonWithIcon variants="primary" onClick={props.onSubmit}>
        Comment
      </ButtonWithIcon>
    </MainContainer>
  );
};
