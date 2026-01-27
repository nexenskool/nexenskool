import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminBlogApi = createApi({
  reducerPath: "adminBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/blogs",
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "",
      providesTags: ["Blog"],
    }),

    getBlogById: builder.query({
      query: (id) => `/${id}`,
    }),

    createBlog: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = adminBlogApi;
