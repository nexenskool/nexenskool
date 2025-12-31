import Link from "next/link";
import ServiceCard from "../../../components/cards/ServiceCard";
import { servicesData } from "../../../components/Services";

export const metadata = {
  title: "Our Services",
  description:
    "Explore our professional services designed to help you grow and succeed.",
};

const Services = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <header className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-semibold text-gray-900">Our Services</h1>
          <p className="mt-3 text-lg text-gray-600">
            We offer a wide range of services tailored to meet your needs.
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-[#3AB1F3]/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Not sure which service you need?
          </h2>
          <p className="mb-6 text-gray-600">
            Talk to our experts and get a personalized recommendation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-[#3AB1F3]
                       px-6 py-3 font-medium text-white transition
                       hover:bg-[#2599DA]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
