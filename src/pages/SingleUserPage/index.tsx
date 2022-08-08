import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BoardCard } from "../../components/BoardCard";
import { Button } from "../../components/Buttons";
import { H5 } from "../../components/Headings";
import { Modal } from "../../components/Modal";
import { PinCard } from "../../components/PinCard";
import { ProfileCard } from "../../components/ProfileCard";
import {
  setHasOnboarded,
  setMode,
  setToken,
} from "../../store/features/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  useGetAllBoardsOfUserQuery,
  useGetAllBoardsQuery,
  useGetAllPinsOfUserQuery,
  useGetSingleUsersQuery,
} from "../../store/services/api-slice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

interface TabProps {
  isActive: boolean;
}
const Tab = styled.div<TabProps>`
  border-bottom: ${(props) =>
    props.isActive ? `2px solid ${props.theme.textColor}` : "none"};
  padding: 0.5rem;
  cursor: pointer;
`;

const BoardsListingContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const EditPinModalContainer = styled.div`
  background-color: ${(props) => props.theme.lightBgColor};
`;

export const SingleUserPage = () => {
  const { id } = useParams();
  const { data: allBoards } = useGetAllBoardsOfUserQuery(id);
  const { data: allPinsCreatedByUser, isLoading } = useGetAllPinsOfUserQuery();
  const { data: singleUser } = useGetSingleUsersQuery(id);
  const [activeTab, setActiveTab] = useState<"created" | "saved">("saved");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      {showModal && (
        <Modal>
          <EditPinModalContainer>
            <H5>Edit Pin</H5>
            <Button variants="primary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </EditPinModalContainer>
        </Modal>
      )}
      <ProfileCard
        username={`@${singleUser?.data.username}`}
        bio={singleUser?.data.bio}
        followers={singleUser?.data.followers.length}
        following={singleUser?.data.following.length}
        type="creator"
      />
      <TabsContainer>
        <Tab
          isActive={activeTab === "created"}
          onClick={() => {
            setActiveTab("created");
          }}
        >
          <H5 weight="bold">Created</H5>
        </Tab>
        <Tab
          isActive={activeTab === "saved"}
          onClick={() => {
            setActiveTab("saved");
          }}
        >
          <H5 weight="bold">Saved</H5>
        </Tab>
      </TabsContainer>
      <BoardsListingContainer>
        {activeTab === "saved" &&
          allBoards?.data?.map((item: any) => (
            <BoardCard
              board={item}
              key={item}
              onClick={() => {
                navigate(`/home/boards/${item._id}`);
              }}
            />
          ))}
        {activeTab === "created" &&
          allPinsCreatedByUser?.data?.map((i: any) => (
            <PinCard
              name={i.name}
              creatorName={`@${i.createdBy.username}`}
              variant="boardVariant"
              image={i.image.url}
              onClick={() => {
                navigate(`/home/pins/${i._id}`);
              }}
            />
          ))}
      </BoardsListingContainer>
    </Container>
  );
};
