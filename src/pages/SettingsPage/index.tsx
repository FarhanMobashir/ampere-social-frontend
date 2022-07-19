import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button } from "../../components/Buttons";
import { CreatorCard } from "../../components/Creator";
import { H1, H3, H5 } from "../../components/Headings";
import { Image } from "../../components/Image";
import { TextFieldWithLabel } from "../../components/Inputs";
import { Paragraph } from "../../components/Paragraphs";
import { useAppSelector } from "../../store/hooks";
import { useUpdateMeMutation } from "../../store/services/api-slice";

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

const EditProfile = () => {
  const user = useAppSelector((state) => state.user.userData);
  const username = user.username;
  console.log(username);

  const [usernameInput, setUsernameInput] = useState(username);

  const [updateUser, { isError }] = useUpdateMeMutation();
  if (isError) {
    toast("Error updating user", { type: "error" });
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
      </UserProfilePhotoContainer>
      <UserDataContainer>
        <TextFieldWithLabel
          label="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </UserDataContainer>
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
