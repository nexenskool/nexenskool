import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminServiceApi = createApi({
  reducerPath: "serviceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
    credentials: "include",
  }),

  tagTypes: ["Service"],

  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => "/services",
      providesTags: ["Service"],
    }),

    getServiceById: builder.query({
      query: (id) => `/services/${id}`,
    }),

    createService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = adminServiceApi;
