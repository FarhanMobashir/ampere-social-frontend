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
  tagTypes: ["user"],
  endpoints: (builder) => ({
    fetchMe: builder.query<any, void>({
      query: () => {
        return "/api/user/me";
      },
      providesTags: ["user"],
      keepUnusedDataFor: 1,
    }),

    updateMe: builder.mutation<any, any>({
      query: (data) => ({
        url: "/api/user/me",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useFetchMeQuery, useUpdateMeMutation } = apiSlice;
