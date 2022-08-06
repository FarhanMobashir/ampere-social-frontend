import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const local = "http://192.168.1.21:8080";

export const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: local,
    prepareHeaders: (headers, { getState }) => {
      // fetch header form redux--- if not found fetch it from local storage
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      } else {
      }
      return headers;
    },
  }),
  tagTypes: ["user", "allUser", "following", "followers", "boards", "pins"],
  endpoints: (builder) => ({
    fetchMe: builder.query<any, void>({
      query: () => {
        return "/api/user/me";
      },
      providesTags: ["user"],
      keepUnusedDataFor: 0,
    }),
    // * user
    updateMe: builder.mutation<any, any>({
      query: (data) => ({
        url: "/api/user/me",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    // * user and followers/following
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: "/api/user/all",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["allUser"],
    }),
    getSingleUsers: builder.query<any, any>({
      query: (id) => ({
        url: `/api/user/${id}`,
      }),
      keepUnusedDataFor: 0,
    }),

    getAllFollowers: builder.query<any, void>({
      query: () => ({
        url: "/api/user/followers",
      }),
      providesTags: ["followers"],
    }),
    getAllFollowings: builder.query<any, void>({
      query: () => ({
        url: "/api/user/followings",
      }),
      providesTags: ["following"],
      keepUnusedDataFor: 0,
    }),
    followUser: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/api/user/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["allUser", "user", "following", "followers"],
    }),
    unfollowUser: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/api/user/unfollow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["allUser", "user", "followers", "following"],
    }),
    // * boards
    getAllBoards: builder.query<any, void>({
      query: () => ({
        url: "/api/boards",
      }),
      providesTags: ["boards"],
      keepUnusedDataFor: 0,
    }),
    getSingleBoard: builder.query<any, any>({
      query: (id) => ({
        url: `api/boards/${id}`,
      }),
      providesTags: ["boards"],
    }),
    deleteSingleBoard: builder.mutation<any, any>({
      query: (id) => ({
        url: `api/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["boards"],
    }),
    createBoard: builder.mutation<any, any>({
      query: (data) => ({
        url: `api/boards`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["boards"],
    }),
    updateBoard: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `api/boards/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["boards"],
    }),
    getAllBoardsOfUser: builder.query<any, any>({
      query: (id) => ({
        url: `/api/boards/user/${id}`,
      }),
      providesTags: ["boards"],
      keepUnusedDataFor: 0,
    }),
    getSingleBoardsOfUser: builder.query<any, any>({
      query: ({ id, boardId }) => ({
        url: `/api/boards/user/${id}${boardId}`,
      }),
      providesTags: ["boards"],
    }),
    // pins
    getAllPins: builder.query<any, void>({
      query: () => ({
        url: "/api/pins/all",
      }),
      providesTags: ["pins"],
      keepUnusedDataFor: 0,
    }),
    getAllPinsOfUser: builder.query<any, void>({
      query: () => ({
        url: "/api/pins",
      }),
      // providesTags: ["pins"],

      keepUnusedDataFor: 0,
    }),
    getSinglePin: builder.query<any, any>({
      query: (id) => ({
        url: `api/pins/p/${id}`,
      }),
      providesTags: ["pins"],
    }),
    deleteSinglePin: builder.mutation<any, void>({
      query: (id) => ({
        url: `api/pins/p/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["pins"],
    }),
    createPin: builder.mutation<any, any>({
      query: (data) => ({
        url: `api/pins`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pins"],
    }),
    updatePin: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `api/pins/p/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["pins"],
    }),
    savePin: builder.mutation<any, any>({
      query: (data) => ({
        url: `api/pins/save`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["pins", "boards"],
    }),
    removePin: builder.mutation<any, any>({
      query: ({ boardId, pinId }) => ({
        url: `api/pins/remove`,
        method: "POST",
        body: {
          boardId,
          pinId,
        },
      }),
      invalidatesTags: ["pins", "boards"],
    }),
  }),
});

export const {
  useFetchMeQuery,
  useUpdateMeMutation,
  useGetAllUsersQuery,
  useGetAllFollowersQuery,
  useGetAllFollowingsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetSingleUsersQuery,
  useGetAllBoardsQuery,
  useGetSingleBoardQuery,
  useDeleteSingleBoardMutation,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useGetAllBoardsOfUserQuery,
  useGetSingleBoardsOfUserQuery,
  useGetAllPinsQuery,
  useGetAllPinsOfUserQuery,
  useGetSinglePinQuery,
  useCreatePinMutation,
  useUpdatePinMutation,
  useDeleteSinglePinMutation,
  useSavePinMutation,
  useRemovePinMutation,
} = apiSlice;
