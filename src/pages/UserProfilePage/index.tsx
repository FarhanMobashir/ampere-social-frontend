import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BoardCard } from "../../components/BoardCard";
import { Button } from "../../components/Buttons";
import { EmptyState } from "../../components/EmptyState";
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
  useFetchMeQuery,
  useGetAllBoardsQuery,
  useGetAllPinsOfUserQuery,
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

export const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  const { data = {}, isLoading } = useFetchMeQuery();
  const { data: allBoards } = useGetAllBoardsQuery();
  const { data: allPinsCreatedByUser } = useGetAllPinsOfUserQuery();
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
        username={`@${data.data.username}`}
        bio={data.data.bio}
        followers={data.data.followers.length}
        following={data.data.following.length}
        type="user"
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
        {activeTab === "saved" && allBoards?.data?.length === 0 && (
          <EmptyState
            title="No Boards Yet"
            subtitle="
          You can create a board by clicking the button below"
            btnText="Create Board"
          />
        )}
        {activeTab === "created" && allPinsCreatedByUser?.data.length === 0 && (
          <EmptyState
            title="No Pins created"
            subtitle="
          You can create a pin by clicking the button below"
            btnText="Create Pin"
          />
        )}
        {activeTab === "created" &&
          allPinsCreatedByUser?.data?.map((i: any) => (
            <PinCard
              name={i.name}
              creatorName={`@${i.createdBy.username}`}
              variant="created"
              image={i.image.url}
              onClick={() => {
                navigate(`/home/pins/${i._id}`);
              }}
              onEdit={() => {
                setShowModal(true);
              }}
            />
          ))}
      </BoardsListingContainer>
      <Button
        variants="primary"
        onClick={() => {
          dispatch(setToken(null));
          dispatch(setHasOnboarded(false));
        }}
      >
        Logout
      </Button>
    </Container>
  );
};
