import styled from "styled-components";
import { CreatorCard } from "../../components/Creator";
import { H1 } from "../../components/Headings";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 0;
`;

export const FollowersListing = () => {
  return (
    <Container>
      <H1>Your Followers</H1>
      {Array.from(Array(10).keys()).map((i) => (
        <CreatorCard variant="single-pin" key={i} />
      ))}
    </Container>
  );
};
