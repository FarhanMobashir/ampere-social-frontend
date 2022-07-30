import { useState } from "react";
import {
  FaBirthdayCake,
  FaBoxOpen,
  FaBoxTissue,
  FaEdit,
  FaGrinStars,
  FaParachuteBox,
  FaSmileBeam,
  FaStarAndCrescent,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Buttons";
import { H1, H2, H3, H6 } from "../../components/Headings";
import { TextFieldWithLabel } from "../../components/Inputs";
import { Modal } from "../../components/Modal";
import { PinCard } from "../../components/PinCard";
import { useGetSingleBoardQuery } from "../../store/services/api-slice";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const PinListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-self: flex-start;
  @media (max-width: 768px) {
    align-self: center;
    gap: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.lightBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const EditBoardModalContainer = styled.div`
  background-color: ${(props) => props.theme.lightBgColor};
  padding: 2rem;
  border-radius: 10px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SingleBoardPage = () => {
  const { id } = useParams();
  const { data } = useGetSingleBoardQuery(id);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [editBoardName, setEditBoardName] = useState("");
  const navigate = useNavigate();
  return (
    <MainContainer>
      {showEditBoard && (
        <Modal>
          <EditBoardModalContainer>
            <H2>Edit Board</H2>
            <TextFieldWithLabel
              placeholder="Edit board name"
              label="Edit name"
              value={editBoardName}
              onChange={(e) => setEditBoardName(e.target.value)}
            />
            <ModalButtonContainer>
              <Button variants="primary">Save</Button>
              <Button
                variants="secondary"
                onClick={() => setShowEditBoard(false)}
              >
                Close
              </Button>
            </ModalButtonContainer>
          </EditBoardModalContainer>
        </Modal>
      )}
      <H1>{data?.data?.name}</H1>
      <ButtonContainer>
        <IconBox>
          <IconButtonContainer
            onClick={() => {
              setEditBoardName(data?.data?.name);
              setShowEditBoard(true);
            }}
          >
            <FaEdit />
          </IconButtonContainer>
          <H6 weight="bold" weightMobile="bold">
            Edit
          </H6>
        </IconBox>
        <IconBox>
          <IconButtonContainer
            onClick={() => {
              navigate(`/home/boards/${data?.data?._id}/more`);
            }}
          >
            <FaSmileBeam />
          </IconButtonContainer>
          <H6 weight="bold" weightMobile="bold">
            More Ideas
          </H6>
        </IconBox>
        <IconBox>
          <IconButtonContainer
            onClick={() => {
              navigate(`/home/boards/${data?.data?._id}/organise`);
            }}
          >
            <FaParachuteBox />
          </IconButtonContainer>
          <H6 weight="bold" weightMobile="bold">
            Organise
          </H6>
        </IconBox>
      </ButtonContainer>
      <PinListingContainer>
        {data?.data?.pins.map((i: any) => (
          <PinCard
            name={i.name}
            creatorName={`@${i.createdBy.username}`}
            variant="boardVariant"
            key={i._id}
          />
        ))}
      </PinListingContainer>
    </MainContainer>
  );
};
