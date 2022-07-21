import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
// import { local } from "../../apiUrls";
import { RootState } from "../store";
import { products } from "./types/product";

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
  tagTypes: ["user", "allUser", "following", "followers"],
  endpoints: (builder) => ({
    fetchMe: builder.query<any, void>({
      query: () => {
        return "/api/user/me";
      },
      providesTags: ["user"],
      keepUnusedDataFor: 0,
    }),

    updateMe: builder.mutation<any, any>({
      query: (data) => ({
        url: "/api/user/me",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
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
} = apiSlice;
