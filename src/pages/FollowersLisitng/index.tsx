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
import { isFollowing } from "../../utils/utilFunctions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 0;
`;

export const FollowersListing = () => {
  const { isLoading, data } = useGetAllFollowersQuery();
  const { data: userData, isLoading: isLoadingUser } = useFetchMeQuery();
  const [follow, { isLoading: isLoadingFollowing }] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();
  const followersArray = userData?.data?.followers;

  if (isLoading || isLoadingFollowing || isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <H1>Your Followers</H1>
      {data.data.map((i: any) => (
        <CreatorCard
          variant="single-pin"
          key={i}
          username={`@${i.username}`}
          subtitle={i.bio}
          buttonText={
            isFollowing(i._id, followersArray) ? "Unfollow" : "Follow"
          }
          buttonVariant={
            isFollowing(i._id, followersArray) ? "primary" : "secondary"
          }
          onClick={() => {
            if (!isFollowing(i._id, followersArray)) {
              follow({ id: i._id });
            } else {
              unfollow({ id: i._id });
            }
          }}
          link={`/home/user/${i._id}`}
          avatar={i.avatar ? i.avatar.url : null}
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
