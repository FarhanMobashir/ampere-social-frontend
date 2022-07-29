import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BoardCard } from "../../components/BoardCard";
import { Button } from "../../components/Buttons";
import { H5 } from "../../components/Headings";
import { ProfileCard } from "../../components/ProfileCard";
import {
  setHasOnboarded,
  setMode,
  setToken,
} from "../../store/features/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  useFetchMeQuery,
  useGetAllBoardsOfUserQuery,
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

export const SingleUserPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data = {}, isLoading } = useGetSingleUsersQuery(id);
  const { data: allBoards } = useGetAllBoardsOfUserQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <ProfileCard
        username={`@${data.data.username}`}
        followers={data.data.followers.length}
        following={data.data.following.length}
        type="creator"
        bio={data.data.bio}
      />
      <TabsContainer>
        <Tab isActive>
          <H5 weight="bold">Created</H5>
        </Tab>
        <Tab isActive={false}>
          <H5 weight="bold">Saved</H5>
        </Tab>
      </TabsContainer>
      <BoardsListingContainer>
        {allBoards?.data?.map((item: any) => (
          <BoardCard board={item} key={item} />
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
