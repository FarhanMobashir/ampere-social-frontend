import styled from "styled-components";
import { CreatorCard } from "../../components/Creator";
import { EmptyState } from "../../components/EmptyState";
import { H1 } from "../../components/Headings";
import { Loader } from "../../components/Loader";
import {
  useFetchMeQuery,
  useFollowUserMutation,
  useGetAllFollowingsQuery,
  useUnfollowUserMutation,
} from "../../store/services/api-slice";
import { isFollowing } from "../../utils/utilFunctions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 0;
`;

export const FollowingListing = () => {
  const { isLoading, data } = useGetAllFollowingsQuery();
  const { data: userData, isLoading: loadingUser } = useFetchMeQuery();
  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();
  const followingArray = userData?.data?.following;

  if (isLoading || loadingUser) return <Loader />;

  return (
    <Container>
      <H1>People you follow</H1>
      {data.data.map((i: any) => (
        <CreatorCard
          variant="single-pin"
          key={i._id}
          avatar={i.avatar ? i.avatar.url : null}
          username={`@${i.username}`}
          subtitle={i.bio}
          buttonText={
            isFollowing(i._id, followingArray) ? "Unfollow" : "Follow"
          }
          buttonVariant={
            isFollowing(i._id, followingArray) ? "primary" : "secondary"
          }
          onClick={() => {
            if (!isFollowing(i._id, followingArray)) {
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
          title="You are not following anyone yet"
          subtitle="Follow people to see their posts here"
        />
      )}
    </Container>
  );
};
