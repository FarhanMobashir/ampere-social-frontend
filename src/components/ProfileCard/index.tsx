import styled from "styled-components";
import { Button } from "../Buttons";
import { H1, H5 } from "../Headings";
import { Image } from "../Image";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 0.2rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const ProfileCard = () => {
  return (
    <MainContainer>
      <Image
        type="circle"
        width="150px"
        height="150px"
        src="https://i.ibb.co/ftMCWW2/portrait-1.jpg"
      />
      <H1
        size="30px"
        sizeMobile="24px"
        weight="bold"
        align="center"
        alignMobile="center"
      >
        John Doe
      </H1>
      <MiddleContainer>
        <H5 weight="bold" color="light">
          11 Followers
        </H5>
        <H5 weight="bold" color="light">
          84 Following
        </H5>
      </MiddleContainer>
      <H5 weight="bold" color="dark">
        http://www.john-doe.com
      </H5>
      <Button variants="tertiary">Edit Profile</Button>
    </MainContainer>
  );
};
