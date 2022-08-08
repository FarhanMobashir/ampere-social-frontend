export const isFollowing = (userId: string, followingArray: string[]) => {
  return followingArray.includes(userId);
};
