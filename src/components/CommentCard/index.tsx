import { FaEllipsisH, FaHeart } from "react-icons/fa";
import styled from "styled-components";
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

export const CommentCard = (props: any) => {
  return (
    <MainContainer>
      <CreatorCard
        username="johndoe"
        variant="comment-card"
        subtitle="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit."
        avatar={""}
        buttonText={""}
      />
      <BottomContainer>
        <H6>2W</H6>
        <H6 weight="bold" weightMobile="bold">
          Reply
        </H6>
        <FaHeart />
        <FaEllipsisH />
      </BottomContainer>
    </MainContainer>
  );
};
