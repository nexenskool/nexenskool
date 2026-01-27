import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authSlice from "./slices/authSlice";
import { adminServiceApi } from "./api/adminServiceApi";
import { scholarshipApi } from "./api/scholarshipApi";
import { adminBlogApi } from "./api/adminBlogApi";
import { testimonialApi } from "./api/testimonialApi";
import { adminTestimonialApi } from "./api/adminTestimonialApi";
import { subServiceApi } from "./api/subServiceApi";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminServiceApi.reducerPath]: adminServiceApi.reducer,
    [scholarshipApi.reducerPath]: scholarshipApi.reducer,
    [adminBlogApi.reducerPath]: adminBlogApi.reducer,
    [testimonialApi.reducerPath]: testimonialApi.reducer,
    [adminTestimonialApi.reducerPath]: adminTestimonialApi.reducer,
    [subServiceApi.reducerPath]: subServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      adminServiceApi.middleware,
      scholarshipApi.middleware,
      adminBlogApi.middleware,
      testimonialApi.middleware,
      adminTestimonialApi.middleware,
      subServiceApi.middleware,
    ),
});

export default store;
