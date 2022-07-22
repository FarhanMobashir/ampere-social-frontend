import styled from "styled-components";
import { CreatorCard } from "../../components/Creator";
import { EmptyState } from "../../components/EmptyState";
import { H1 } from "../../components/Headings";
import {
  useFetchMeQuery,
  useFollowUserMutation,
  useGetAllFollowersQuery,
  useUnfollowUserMutation,
} from "../../store/services/api-slice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 0;
`;

export const FollowersListing = () => {
  const { isLoading, data } = useGetAllFollowersQuery();
  const { data: userData } = useFetchMeQuery();
  const [follow, { isLoading: isLoadingFollowing }] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isFollowing = (userId: any) => {
    const found = userData.data.following.includes(userId);
    console.log(found);
    return found;
  };

  return (
    <Container>
      <H1>Your Followers</H1>
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
          link={`/home/user/${i._id}`}
        />
      ))}
      {data.data.length === 0 && (
        <EmptyState
          title="You have no followers yet"
          subtitle="Follow people to see their posts here"
        />
      )}
    </Container>
  );
};
