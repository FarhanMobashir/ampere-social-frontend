import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button } from "../../components/Buttons";
import { CreatorCard } from "../../components/Creator";
import { H1, H3, H5 } from "../../components/Headings";
import { Image } from "../../components/Image";
import { TextFieldWithLabel } from "../../components/Inputs";
import { CategoryData } from "../../components/OnboardingModal";
import { Paragraph } from "../../components/Paragraphs";
import { useAppSelector } from "../../store/hooks";
import {
  useFetchMeQuery,
  useUpdateMeMutation,
} from "../../store/services/api-slice";

const Container = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
`;

const UserProfilePhotoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserDataContainer = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InterestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 0.8rem;
`;

const InterestBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.textColor};
  padding: 1rem;
  border-radius: 0.5rem;
`;

const EditProfile = () => {
  const { data, isLoading } = useFetchMeQuery();
  const [updateUser, { isError, data: updatedUserData, isSuccess }] =
    useUpdateMeMutation();

  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    if (isError) {
      toast("Error updating user", { type: "error" });
    }
    if (isSuccess) {
      toast("User updated successfully", { type: "success" });
    }
    if (!isLoading) {
      setUsernameInput(data.data.username);
    }
  }, [isSuccess, isError, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <H1 weight="bold" weightMobile="bold">
        Public Profile
      </H1>
      <Paragraph color="light">
        People visiting your profile will see the following information:
      </Paragraph>
      <UserProfilePhotoContainer>
        <Image
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          width="70px"
          height="70px"
          type="circle"
        />
        <Button variants="tertiary">Change</Button>
        <Button
          variants="primary"
          onClick={() => {
            updateUser({
              username: usernameInput,
            });
          }}
        >
          Save
        </Button>
      </UserProfilePhotoContainer>
      <UserDataContainer>
        <TextFieldWithLabel
          label="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </UserDataContainer>
      <H3 weight="bold">Interests</H3>
      <InterestContainer>
        {!isLoading &&
          CategoryData.map((interest: any) => (
            <InterestBox key={interest.name}>
              <H5>{interest.name}</H5>
              <Button
                variants={
                  data.data.interests.includes(interest.name)
                    ? "tertiary"
                    : "secondary"
                }
                onClick={() => {
                  if (data.data.interests.includes(interest.name)) {
                    updateUser({
                      interests: data.data.interests.filter(
                        (i: string) => i !== interest.name
                      ),
                    });
                  } else {
                    updateUser({
                      interests: [...data.data.interests, interest.name],
                    });
                  }
                }}
              >
                {!isLoading && data.data.interests.includes(interest.name)
                  ? "Remove"
                  : "Add"}
              </Button>
            </InterestBox>
          ))}
      </InterestContainer>
    </>
  );
};

export const SettingsPage = () => {
  return (
    <Container>
      <ContentContainer>
        <EditProfile />
      </ContentContainer>
    </Container>
  );
};
