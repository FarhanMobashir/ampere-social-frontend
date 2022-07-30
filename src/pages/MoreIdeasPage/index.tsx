import styled from "styled-components";
import { PinCard } from "../../components/PinCard";

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const MoreIdeasPage = () => {
  return (
    <MainContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item) => {
        return (
          <PinCard
            name="Hello"
            creatorName={"@qwerty"}
            variant={"more-ideas"}
          />
        );
      })}
    </MainContainer>
  );
};
