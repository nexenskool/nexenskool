import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testimonialApi = createApi({
  reducerPath: "testimonialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/testimonials",
  }),
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => "/",
      providesTags: ["Testimonial"],
    }),
    createTestimonial: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Testimonial"],
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useCreateTestimonialMutation,
} = testimonialApi;
