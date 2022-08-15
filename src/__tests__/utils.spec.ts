import { isFollowing } from "../utils/utilFunctions";

describe("isFollowing", () => {
  test("returns true if user is following", () => {
    const userId = "123";
    const followingArray: string[] = ["123", "456"];
    expect(isFollowing(userId, followingArray)).toBe(true);
  }),
    test("returns false if user is not following", () => {
      const userId = "789";
      const followingArray = ["123", "456"];
      expect(isFollowing(userId, followingArray)).toBe(false);
    }),
    test("returns false if user is not following and array is empty", () => {
      const userId = "789";
      const followingArray: string[] = [];
      expect(isFollowing(userId, followingArray)).toBe(false);
    });
});
