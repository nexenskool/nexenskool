"use client";

import { useGetServicesQuery } from "@/store/api/adminServiceApi";

export default function ServicesPage() {
  const { data, isLoading, isError } = useGetServicesQuery();
  const services = data?.services || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-16 text-center">
          Our Services
        </h2>

        {isLoading ? (
          /* Skeleton Loading */
          <div className="flex flex-col gap-16">
            {[...Array(3)].map((_, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Skeleton */}
                  <div className="md:w-1/2 relative h-64 md:h-[400px] bg-gray-200" />

                  {/* Text Skeleton */}
                  <div className="md:w-1/2 p-8 flex flex-col justify-center gap-4 w-full">
                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                    <div className="h-5 bg-gray-200 rounded w-full" />
                    <div className="h-5 bg-gray-200 rounded w-11/12" />
                    <div className="h-5 bg-gray-200 rounded w-10/12" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : isError ? (
          /* Error */
          <p className="text-center text-red-500 text-lg">
            Failed to load services.
          </p>
        ) : services.length === 0 ? (
          /* Empty */
          <p className="text-center text-gray-500 text-lg">
            No services available yet
          </p>
        ) : (
          /* Data */
          <div className="flex flex-col gap-16">
            {services.map((service, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={service._id}
                  className={`flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl hover:scale-[1.02] ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="md:w-1/2 relative h-64 md:h-[400px]">
                    <img
                      src={service.image}
                      alt={service.name}
                      className={`w-full h-full object-cover rounded-lg md:rounded-none ${
                        isEven ? "md:rounded-r-2xl" : "md:rounded-l-2xl"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Text */}
                  <div className="md:w-1/2 p-8 flex flex-col justify-center gap-6">
                    <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {service.longDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
