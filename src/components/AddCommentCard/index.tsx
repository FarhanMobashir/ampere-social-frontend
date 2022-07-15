import styled from "styled-components";
import { Image } from "../Image";
import { TextField } from "../Inputs";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export const AddCommentCard = () => {
  return (
    <MainContainer>
      <Image
        type="circle"
        height="30px"
        width="30px"
        src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
      />
      <TextField placeholder="Add a comment" />
    </MainContainer>
  );
};
