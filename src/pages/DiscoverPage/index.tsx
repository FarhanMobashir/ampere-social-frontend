import styled from "styled-components";
import { CreatorCard } from "../../components/Creator";
import { H1 } from "../../components/Headings";
import {
  useFetchMeQuery,
  useFollowUserMutation,
  useGetAllUsersQuery,
  useUnfollowUserMutation,
} from "../../store/services/api-slice";
import { isFollowing } from "../../utils/utilFunctions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 0;
`;

export const DiscoverPeople = () => {
  const { data = [], isLoading } = useGetAllUsersQuery();
  const { data: userData, isLoading: loadingUser } = useFetchMeQuery();
  const [follow, { isLoading: isLoadingFollowing }] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  const followingArray = userData?.data?.following;

  if (isLoading || loadingUser) return <div>Loading...</div>;
  return (
    <Container>
      <H1 sizeMobile="1.5rem">People You May Like</H1>
      {data?.data?.map((i: any) => (
        <CreatorCard
          variant="single-pin"
          key={i}
          avatar={i.avatar ? i.avatar.url : null}
          username={`@${i.username}`}
          subtitle={i.bio}
          buttonText={
            isFollowing(i._id, followingArray) ? "Following" : "Follow"
          }
          onClick={() => {
            if (!isFollowing(i._id, followingArray)) {
              follow({ id: i._id });
            } else {
              unfollow({ id: i._id });
            }
          }}
          buttonVariant={
            isFollowing(i._id, followingArray) ? "primary" : "secondary"
          }
          link={`/home/user/${i._id}`}
        />
      ))}
    </Container>
  );
};
