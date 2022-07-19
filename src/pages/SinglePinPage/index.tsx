import styled from "styled-components";
import { H3 } from "../../components/Headings";
import { PinCard } from "../../components/PinCard";
import { SinglePin } from "../../components/SinglePin";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding-top: 1rem;
`;

const PinListingContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-start;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    align-self: center;
    gap: 2rem;
  }
`;

export const SinglePinPage = () => {
  return (
    <MainContainer>
      <SinglePin />
      <H3>Similar Ideas</H3>
      <PinListingContainer>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <PinCard variant="normal" key={i} />
        ))}
      </PinListingContainer>
    </MainContainer>
  );
};
