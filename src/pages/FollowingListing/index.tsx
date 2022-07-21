import styled from "styled-components";
import { CreatorCard } from "../../components/Creator";
import { EmptyState } from "../../components/EmptyState";
import { H1 } from "../../components/Headings";
import {
  useFetchMeQuery,
  useFollowUserMutation,
  useGetAllFollowersQuery,
  useGetAllFollowingsQuery,
  useUnfollowUserMutation,
} from "../../store/services/api-slice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 0;
`;

export const FollowingListing = () => {
  const { isLoading, data } = useGetAllFollowingsQuery();
  const { data: userData, isLoading: loadingUser } = useFetchMeQuery();
  const [follow, { isLoading: isLoadingFollowing }] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  const isFollowing = (userId: any) => {
    const found = userData.data.following.includes(userId);
    console.log(found);
    return found;
  };

  if (isLoading || loadingUser) return <div>Loading...</div>;

  return (
    <Container>
      <H1>People you follow</H1>
      {data.data.map((i: any) => (
        <CreatorCard
          variant="single-pin"
          key={i}
          avatar="https://i.pravatar.cc/300"
          username={`@${i.username}`}
          subtitle={i.bio}
          buttonText={isFollowing(i._id) ? "Following" : "Follow"}
          buttonVariant={isFollowing(i._id) ? "primary" : "secondary"}
          onClick={() => {
            if (!isFollowing(i._id)) {
              follow({ id: i._id });
            } else {
              unfollow({ id: i._id });
            }
          }}
        />
      ))}
      {data.data.length === 0 && (
        <EmptyState
          title="You are not following anyone yet"
          subtitle="Follow people to see their posts here"
        />
      )}
    </Container>
  );
};
