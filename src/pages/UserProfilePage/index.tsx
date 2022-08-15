import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BoardCard } from "../../components/BoardCard";
import { Button } from "../../components/Buttons";
import { EmptyState } from "../../components/EmptyState";
import { H5 } from "../../components/Headings";
import { TextFieldWithLabel } from "../../components/Inputs";
import { Loader } from "../../components/Loader";
import { Modal } from "../../components/Modal";
import { PinCard } from "../../components/PinCard";

import { ProfileCard } from "../../components/ProfileCard";
import { setHasOnboarded, setToken } from "../../store/features/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  useDeleteSinglePinMutation,
  useFetchMeQuery,
  useGetAllBoardsQuery,
  useGetAllPinsOfUserQuery,
  useUpdatePinMutation,
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
  padding: 2rem;
  border-radius: 10px;
`;

const EditModalBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.user);
  const { data = {}, isLoading } = useFetchMeQuery();
  const { data: allBoards } = useGetAllBoardsQuery();
  const { data: allPinsCreatedByUser } = useGetAllPinsOfUserQuery(userData._id);
  const [updatePin] = useUpdatePinMutation();
  const [deletePin] = useDeleteSinglePinMutation();

  const [activeTab, setActiveTab] = useState<"created" | "saved">("saved");
  const [showModal, setShowModal] = useState(false);
  const [selectedPin, setSelectedPin] = useState<any>();
  const [pinName, setPinName] = useState("");
  const [pinDescription, setPinDescription] = useState("");

  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      {showModal && (
        <Modal>
          <EditPinModalContainer>
            <TextFieldWithLabel
              value={pinName}
              onChange={(e) => setPinName(e.target.value)}
              placeholder="Edit pin name"
              label="Edit Pin"
            />
            <TextFieldWithLabel
              value={pinDescription}
              placeholder="Edit pin description"
              onChange={(e) => setPinDescription(e.target.value)}
              label="Edit Description"
            />
            <EditModalBottomContainer>
              <Button variants="tertiary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button
                variants="primary"
                onClick={() => {
                  updatePin({
                    id: selectedPin._id,
                    data: {
                      name: pinName,
                      description: pinDescription,
                    },
                  });
                  setShowModal(false);
                }}
              >
                Save
              </Button>
              <Button
                variants="primary"
                onClick={() => {
                  deletePin(selectedPin._id);
                  setShowModal(false);
                }}
              >
                Delete
              </Button>
            </EditModalBottomContainer>
          </EditPinModalContainer>
        </Modal>
      )}
      <ProfileCard
        username={`@${data.data.username}`}
        bio={data.data.bio}
        followers={data.data.followers.length}
        following={data.data.following.length}
        type="user"
        avatar={data.data.avatar ? data.data.avatar.url : null}
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
              key={item._id}
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
          />
        )}
        {activeTab === "created" && allPinsCreatedByUser?.data.length === 0 && (
          <EmptyState
            title="No Pins created"
            subtitle="
          You can create a pin by clicking the button below"
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
                setSelectedPin(i);
                setPinName(i.name);
                setPinDescription(i.description);
              }}
              avatar={i.createdBy.avatar ? i.createdBy.avatar.url : null}
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
