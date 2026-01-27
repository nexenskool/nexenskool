import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subServiceApi = createApi({
  reducerPath: "subServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
    credentials: "include",
  }),
  tagTypes: ["SubService"],
  endpoints: (builder) => ({
    getSubServices: builder.query({
      query: (serviceId) =>
        serviceId ? `/sub-services?service=${serviceId}` : `/sub-services`,
      providesTags: ["SubService"],
    }),

    getSubService: builder.query({
      query: (id) => `/sub-services/${id}`,
      providesTags: (result, error, id) => [{ type: "SubService", id }],
    }),

    createSubService: builder.mutation({
      query: (data) => ({
        url: `/sub-services`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubService"],
    }),

    updateSubService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/sub-services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "SubService", id }],
    }),

    deleteSubService: builder.mutation({
      query: (id) => ({
        url: `/sub-services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubService"],
    }),
  }),
});

export const {
  useGetSubServicesQuery,
  useGetSubServiceQuery,
  useCreateSubServiceMutation,
  useUpdateSubServiceMutation,
  useDeleteSubServiceMutation,
} = subServiceApi;
