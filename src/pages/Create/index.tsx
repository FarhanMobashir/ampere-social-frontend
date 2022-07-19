import { useState } from "react";
import { FaArrowDown, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import styled from "styled-components";
import { Button, ButtonWithIcon } from "../../components/Buttons";
import { CreatorCard } from "../../components/Creator";
import { H1, H3 } from "../../components/Headings";
import { Image } from "../../components/Image";
import { TextField } from "../../components/Inputs";
import { Paragraph } from "../../components/Paragraphs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const AddPinContainer = styled.div`
  display: flex;
  box-shadow: 0px 0px 5px ${({ theme }) => theme.tertiaryColor};
  border-radius: 10px;
  justify-content: space-between;
  padding: 1rem;
  width: 70%;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    justify-content: center;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${(props) => props.theme.textColorLight};
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ImageInput = styled.input`
  opacity: 0;
  width: 300px;
  height: 300px;
  /* z-index: 2; */
  grid-column: 1 /3;
  grid-row: 1 /3;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  grid-column: 1 /3;
  grid-row: 1 /3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
`;

const TitleInput = styled.input`
  font-size: 1.6rem;
  outline: none;
  border: none;
  font-weight: bold;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-bottom: 1px solid ${(props) => props.theme.textColorLight};
  @media (max-width: 800px) {
    font-size: 1.2rem;
  }
`;

const DescriptionInput = styled.textarea`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 1rem;
  border-radius: 10px;
`;

const SelectBoardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BoardsListingCotainer = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0px 0px 10px ${({ theme }) => theme.tertiaryColor};
  border-radius: 10px;
  padding: 1rem;
`;

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  overflow-y: scroll;
`;

const BoardBox = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  /* border-bottom: 2px dashed ${(props) => props.theme.textColorLight}; */
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.lightBgColor};
    transition: cubic-bezier(1, 0, 0, 1) 0.3s;
  }
`;

const TextFieldContainer = styled.div``;

export const Create = () => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fileSelectHandler = (e: any) => {
    const file = e.target.files;
    // console.log(file);
    const id = e.target.id;
    let previewImage = Object.keys(file).map((i, idx) =>
      URL.createObjectURL(file[idx])
    );
    setImage(file[0]);
    setImageUrl(previewImage[0]);
    console.log(previewImage);
  };

  const [showSelectBoard, setShowSelectBoard] = useState(false);

  return (
    <Container>
      <H1 weight="bold" weightMobile="bold">
        Create Pin
      </H1>
      <AddPinContainer>
        <LeftContainer>
          {!imageUrl ? (
            <ImageUploadContainer>
              <ImageInput
                type="file"
                placeholder=""
                accept=".jpg,.jpeg,.png"
                onChange={fileSelectHandler}
              />
              <ImageContainer>
                <FaUpload
                  size={60}
                  style={{
                    background: "red",
                    borderRadius: "50%",
                    color: "white",
                    padding: "1rem",
                  }}
                />
                <Paragraph
                  align="center"
                  alignMobile="center"
                  weight="bold"
                  weightMobile="bold"
                >
                  Upload a photo of your pin to share with the world.
                </Paragraph>
              </ImageContainer>
            </ImageUploadContainer>
          ) : (
            <ImageContainer>
              <FaTrash
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setImageUrl(null)}
              />
              <Image src={imageUrl} width="20rem" height="auto" />
            </ImageContainer>
          )}
        </LeftContainer>
        <RightContainer>
          <SelectBoardContainer>
            <H3 weight="bold" weightMobile="bold">
              Select a board
            </H3>
            <ButtonWithIcon
              variants="tertiary"
              onClick={() => setShowSelectBoard(!showSelectBoard)}
            >
              cars ideas
              <FaArrowDown size={20} />
            </ButtonWithIcon>
          </SelectBoardContainer>
          {showSelectBoard && (
            <BoardsListingCotainer>
              <BoardsContainer>
                <BoardBox>
                  <Image
                    width="40px"
                    height="40px"
                    src="https://picsum.photos/200"
                  />
                  <Paragraph weight="bold">Cars Ideas</Paragraph>
                </BoardBox>
                <BoardBox>
                  <Image
                    width="40px"
                    height="40px"
                    src="https://picsum.photos/200"
                  />
                  <Paragraph weight="bold">Cars Ideas</Paragraph>
                </BoardBox>
                <BoardBox>
                  <Image
                    width="40px"
                    height="40px"
                    src="https://picsum.photos/200"
                  />
                  <Paragraph weight="bold">Cars Ideas</Paragraph>
                </BoardBox>
                <BoardBox>
                  <Image
                    width="40px"
                    height="40px"
                    src="https://picsum.photos/200"
                  />
                  <Paragraph weight="bold">Cars Ideas</Paragraph>
                </BoardBox>
              </BoardsContainer>
              <TextFieldContainer>
                <TextField placeholder="Enter board name" />
              </TextFieldContainer>
              <ButtonWithIcon variants="secondary">
                Create a new board
                <FaPlus size={20} />
              </ButtonWithIcon>
            </BoardsListingCotainer>
          )}
          <TitleInput placeholder="Add your title" />
          <DescriptionInput placeholder="Add your description" />
          <Button
            style={{
              margin: "0 auto",
            }}
            variants="primary"
          >
            Create Pin
          </Button>
        </RightContainer>
      </AddPinContainer>
    </Container>
  );
};
