"use client";

import Link from "next/link";
import { useGetServicesQuery } from "@/store/api/adminServiceApi";
import { ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const { data, isLoading, isError } = useGetServicesQuery();
  const services = data?.services || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Our Services
        </h2>

        {isLoading ? (
          /* Skeleton Loading */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          /* Error */
          <p className="text-center text-red-500">Failed to load services.</p>
        ) : services.length === 0 ? (
          /* Empty */
          <p className="text-center text-gray-500">No services available yet</p>
        ) : (
          /* Data */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.name}
                  </h3>

                  {service.shortDesc && (
                    <p className="text-gray-600">{service.shortDesc}</p>
                  )}

                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-[#2495ef] font-medium hover:underline"
                  >
                    Learn More
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
