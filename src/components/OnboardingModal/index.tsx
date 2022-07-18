import { useState } from "react";
import styled from "styled-components";
import { Button } from "../Buttons";
import { H1, H3 } from "../Headings";
import { Image } from "../Image";
import { Modal } from "../Modal";
import { Paragraph } from "../Paragraphs";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.bgColor};
  width: 600px;
  border-radius: 10px;
  padding: 1.6rem;
  width: 40vw;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const StepContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

interface CicrleProps {
  active: boolean;
}

const Circle = styled.div<CicrleProps>`
  width: ${({ active }) => (active ? "20px" : "10px")};
  height: ${({ active }) => (active ? "20px" : "10px")};
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#000000" : "#6b6b6b")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 1rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #fcd5db;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
`;

const CategoriesBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  height: 300px;
  overflow-y: scroll;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div``;

const CategoryTitleContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const WelcomeComponent = () => {
  return (
    <>
      <Avatar>F</Avatar>
      <H1 weight="bold" align="center">
        Welcome to Pinit Farhan
      </H1>
      <Paragraph size="1.2rem" align="center" color="light">
        Your answer to next few questions will help us to personalize your
        experience.
      </Paragraph>
      <Button variants="primary" size="large">
        Next
      </Button>
    </>
  );
};

const GenderComponent = () => {
  return (
    <>
      <H1 weight="bold" align="center">
        How do you identify yourself?
      </H1>
      <Paragraph size="1.2rem" align="center" color="light">
        We will use this information to personalize your experience.
      </Paragraph>
      <label>
        Female
        <input type="radio" name="gender" />
      </label>
      <label>
        Male
        <input type="radio" name="gender" />
      </label>
      <label>
        Specify Other
        <input type="radio" name="gender" />
      </label>
      <Button variants="primary">Next</Button>
    </>
  );
};

const SelectCategory = () => {
  return (
    <>
      <H1 weight="bold" align="center" sizeMobile="1.4rem" alignMobile="center">
        Tell us what you are interested in
      </H1>
      <CategoriesBox>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <CategoryBox>
            <ImageContainer>
              <Image
                src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                width="100px"
                height="100px"
                widthMobile="80px"
                heightMobile="80px"
                filter="contrast(0.5)"
              />
            </ImageContainer>
            <CategoryTitleContainer>
              <H3 weight="bold">Food</H3>
            </CategoryTitleContainer>
          </CategoryBox>
        ))}
      </CategoriesBox>
      <Button variants="primary">Pick 5 or more</Button>
    </>
  );
};

export const OnboardingModal = () => {
  return (
    <Modal>
      <MainContainer>
        <StepContainer>
          <Circle active={false}></Circle>
          <Circle active={true}></Circle>
          <Circle active={false}></Circle>
        </StepContainer>
        {/* <WelcomeComponent /> */}
        {/* <GenderComponent /> */}
        <SelectCategory />
      </MainContainer>
    </Modal>
  );
};
