"use client";

import { useGetTestimonialsQuery } from "@/store/api/testimonialApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TestimonialsSection() {
  const { data, isLoading, isError } = useGetTestimonialsQuery();
  const testimonials = data?.testimonials?.filter((t) => t.isApproved) || [];

  return (
    <section className="relative py-24 bg-gray-50">
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Trusted feedback from real people who benefited from our services
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse min-h-[360px]"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-11/12 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-10/12 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">
            Failed to load testimonials.
          </p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500">No testimonials yet.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="group bg-white rounded-2xl shadow-lg p-8 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300">
                  {/* Top: Avatar and name */}
                  <div className="flex flex-col items-center mb-6">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover mb-4 shadow-md"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2495ef] to-purple-500 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-md">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <h4 className="text-gray-900 font-semibold text-lg">
                      {testimonial.name}
                    </h4>
                    {testimonial.designation && (
                      <p className="text-gray-500 text-sm">
                        {testimonial.designation}
                      </p>
                    )}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                    “{testimonial.message}”
                  </p>

                  {/* Accent bar */}
                  <div className="mt-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#2495ef] to-purple-500 mx-auto" />
                </div>
              </SwiperSlide>
            ))}

            {/* Custom arrow styling */}
            <style jsx>{`
              :global(.swiper-button-next),
              :global(.swiper-button-prev) {
                color: #2495ef;
                width: 28px;
                height: 28px;
              }
              :global(.swiper-button-next::after),
              :global(.swiper-button-prev::after) {
                font-size: 16px;
              }
            `}</style>
          </Swiper>
        )}
      </div>
    </section>
  );
}
