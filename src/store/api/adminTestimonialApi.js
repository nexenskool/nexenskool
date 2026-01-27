import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminTestimonialApi = createApi({
  reducerPath: "adminTestimonialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/testimonials",
    credentials: "include",
  }),
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => "/",
      providesTags: ["Testimonial"],
    }),

    getTestimonialById: builder.query({
      query: (id) => `/${id}`,
    }),

    createTestimonial: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Testimonial"],
    }),

    updateTestimonial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Testimonial"],
    }),

    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonial"],
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = adminTestimonialApi;
