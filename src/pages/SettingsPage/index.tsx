import { useEffect, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";

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

const ProfileImageContainer = styled.div``;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fcd5db;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColorDark};
  font-size: 3rem;
  font-weight: bold;
  grid-column: 1 /3;
  grid-row: 1 /3;
`;

const UploadImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 82px;
  height: 36px;
`;
const UploadImageInput = styled.input`
  opacity: 0;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  height: 36px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  height: 36px;
`;

const EditProfile = () => {
  const { data, isLoading } = useFetchMeQuery();
  const [
    updateUser,
    { isError, data: updatedUserData, isSuccess, isLoading: isUpdatingUser },
  ] = useUpdateMeMutation();

  const [usernameInput, setUsernameInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [profileImage, setProfileImage] = useState<{
    file: any;
    preview: string | null;
  }>({
    file: null,
    preview: null,
  });

  useEffect(() => {
    if (isError) {
      toast("Error updating user", { type: "error" });
    }
    if (isSuccess) {
      toast("User updated successfully", { type: "success" });
      setProfileImage({
        file: null,
        preview: null,
      });
    }
    if (!isLoading) {
      setUsernameInput(data.data.username);
      setBioInput(data.data.bio);
    }
    if (updatedUserData) {
      setUsernameInput(updatedUserData.data.username);
      setBioInput(updatedUserData.data.bio ? updatedUserData.data.bio : "");
    }
  }, [isSuccess, isError, isLoading]);

  function updateUserHandler() {
    const formData = new FormData();
    formData.append("username", usernameInput);
    formData.append("bio", bioInput);
    if (profileImage.file) {
      formData.append("avatar", profileImage.file);
    }

    updateUser(formData);
  }

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
        <ProfileImageContainer>
          {data.data.avatar && (
            <Image
              src={data.data.avatar.url}
              width="70px"
              height="70px"
              type="circle"
            />
          )}
          {!data?.data.avatar && (
            <>
              {profileImage.preview ? (
                <>
                  <Image
                    src={profileImage.preview}
                    width="100px"
                    height="100px"
                    type="circle"
                  />
                  <FaTrash
                    onClick={() => {
                      setProfileImage({
                        preview: "",
                        file: null,
                      });
                    }}
                  />
                </>
              ) : (
                <Avatar>{data?.data.username[0].toUpperCase()}</Avatar>
              )}
            </>
          )}
        </ProfileImageContainer>
        <UploadImageContainer>
          <ButtonContainer>
            <Button variants="tertiary">Change</Button>
          </ButtonContainer>
          <UploadImageInput
            type="file"
            onChange={(e: any) => {
              setProfileImage({
                file: e.target.files[0],
                preview: URL.createObjectURL(e.target.files[0]),
              });
            }}
          />
        </UploadImageContainer>

        <Button
          variants={isUpdatingUser ? "disabled" : "primary"}
          onClick={updateUserHandler}
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
        <TextFieldWithLabel
          label="Bio"
          value={bioInput}
          onChange={(e) => setBioInput(e.target.value)}
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
