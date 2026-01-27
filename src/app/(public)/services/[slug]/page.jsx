"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetServicesQuery } from "@/store/api/adminServiceApi";
import { useGetSubServicesQuery } from "@/store/api/subServiceApi";

export default function ServiceDetailsPage() {
  const params = useParams();
  const { slug } = params;

  // Fetch services
  const {
    data: servicesData,
    isLoading: loadingServices,
    isError: errorServices,
  } = useGetServicesQuery();

  // Find the current service by slug
  const service = servicesData?.services.find((s) => s.slug === slug);

  // Fetch sub-services for this service
  const { data: subServicesData, isLoading: loadingSubServices } =
    useGetSubServicesQuery(service?._id, {
      skip: !service?._id,
    });

  if (loadingServices)
    return (
      <p className="text-center py-20 text-gray-500 text-lg">
        Loading service...
      </p>
    );

  if (errorServices || !service)
    return (
      <p className="text-center py-20 text-red-500 text-lg">
        Service not found or failed to load.
      </p>
    );

  return (
    <article className="bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        {/* Back Link */}
        <Link
          href="/services"
          className="text-[#2495ef] font-medium hover:underline mb-6 inline-block"
        >
          &larr; Back to Services
        </Link>

        {/* Service Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          {service.name}
        </h1>

        {/* Long Description */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-700">
          {service.longDesc.split("\n\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        {/* Sub Services */}
        {subServicesData?.data.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subServicesData.data.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
                >
                  <img
                    src={sub.image}
                    alt={sub.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{sub.title}</h3>
                  <p className="text-gray-600 flex-1">{sub.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Button */}
        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-block bg-[#2495ef] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1f86d6] shadow-lg transition-transform transform hover:scale-[1.03]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </article>
  );
}
