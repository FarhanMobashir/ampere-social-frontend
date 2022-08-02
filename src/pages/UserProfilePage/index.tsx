import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BoardCard } from "../../components/BoardCard";
import { Button } from "../../components/Buttons";
import { H5 } from "../../components/Headings";
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

export const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  const { data = {}, isLoading } = useFetchMeQuery();
  const { data: allBoards } = useGetAllBoardsQuery();
  const { data: allPinsCreatedByUser } = useGetAllPinsOfUserQuery();
  const [activeTab, setActiveTab] = useState<"created" | "saved">("saved");

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
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
