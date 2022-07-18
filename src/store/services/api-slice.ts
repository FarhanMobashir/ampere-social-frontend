import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { local } from "../../apiUrls";
import { RootState } from "../store";
import { products } from "./types/product";

const local = "http://localhost:8000";

export const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: local,
    prepareHeaders: (headers, { getState }) => {
      // fetch header form redux--- if not found fetch it from local storage
      const token = (getState() as RootState).user.userData?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      } else {
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Shop"],
  endpoints: (builder) => ({
    fetchMe: builder.query<any, void>({
      query: () => {
        return "/vendor/me";
      },
    }),
    getCategory: builder.query<any, void>({
      query: () => {
        return "/category";
      },
    }),
    // ? product endpoint
    createProduct: builder.mutation<any, any>({
      query: ({ formData, shopId }) => ({
        url: `/product/vendor/${shopId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    getAllProduct: builder.query<typeof products, void>({
      query: (shopId) => {
        return `/product/vendor/${shopId}`;
      },
      providesTags: ["Product"],
    }),
    deleteSingleProduct: builder.mutation({
      query: ({ shopId, productId }: any) => ({
        url: `/product/vendor/${shopId}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateSingleProduct: builder.mutation({
      query: ({ shopId, productId, body }: any) => ({
        url: `/product/vendor/${shopId}/${productId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Product"],
    }),
    // s
    getShops: builder.query<any, void>({
      query: () => {
        return "/shop/shops";
      },
      providesTags: ["Shop"],
    }),
    updateSingleShop: builder.mutation({
      query: ({ shopId, body }: any) => ({
        url: `/shop/${shopId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Product", "Shop"],
    }),
    getAllProductS: builder.query<typeof products, void>({
      query: () => {
        return `/product/superadmin/p/all`;
      },
    }),
  }),
});

export const {
  useFetchMeQuery,
  useGetCategoryQuery,
  useCreateProductMutation,
  useGetAllProductQuery,
  useDeleteSingleProductMutation,
  useUpdateSingleProductMutation,
  useGetShopsQuery,
  useGetAllProductSQuery,
  useUpdateSingleShopMutation,
} = apiSlice;
