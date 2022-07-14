import { FaArrowDown } from "react-icons/fa";
import styled from "styled-components";
import { AddCommentCard } from "../AddCommentCard";
import { Button, ButtonWithIcon } from "../Buttons";
import { CommentCard } from "../CommentCard";
import { CreatorCard } from "../Creator";
import { H1, H3, H4 } from "../Headings";
import { Image } from "../Image";
import { TextFiled } from "../Inputs";

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
export const SinglePin = () => {
  return (
    <MainContainer>
      <ImageContainer>
        <Image
          src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
          width="300px"
          height="auto"
        />
      </ImageContainer>

      <LeftContainer>
        <TopButtonContainer>
          <ButtonWithIcon variants="transparent" size="regular">
            men-out... <FaArrowDown />
          </ButtonWithIcon>
          <Button variants="primary" size="regular">
            Save
          </Button>
        </TopButtonContainer>
        <H1 sizeMobile="1.2rem" alignMobile="center">
          Basic White T-shirt - Men Casual Outfit
        </H1>
        <H4 sizeMobile="0.8rem" alignMobile="center">
          Follow James on Instagram @lifestyle_of_james
        </H4>
        <CreatorCard variant="single-pin" />
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
