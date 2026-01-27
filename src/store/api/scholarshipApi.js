import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scholarshipApi = createApi({
  reducerPath: "scholarshipApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),

  tagTypes: ["Scholarship"],

  endpoints: (builder) => ({
    getScholarships: builder.query({
      query: () => "/scholarships",
      providesTags: ["Scholarship"],
    }),

    getScholarshipById: builder.query({
      query: (id) => `/scholarships/${id}`,
      providesTags: ["Scholarship"],
    }),

    createScholarship: builder.mutation({
      query: (data) => ({
        url: "/scholarships",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Scholarship"],
    }),

    updateScholarship: builder.mutation({
      query: ({ id, data }) => ({
        url: `/scholarships/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Scholarship"],
    }),

    deleteScholarship: builder.mutation({
      query: (id) => ({
        url: `/scholarships/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Scholarship"],
    }),
  }),
});

export const {
  useGetScholarshipsQuery,
  useGetScholarshipByIdQuery,
  useCreateScholarshipMutation,
  useUpdateScholarshipMutation,
  useDeleteScholarshipMutation,
} = scholarshipApi;
