import Link from "next/link";
import ServiceCard from "../components/cards/ServiceCard";

export const servicesData = [
  {
    title: "Custom Software Development",
    shortDesc:
      "Scalable web and mobile solutions tailored to your business needs.",
    icon: "💻",
    slug: "/custom-software-development",
  },
  {
    title: "Project / Thesis / Assignment Writing",
    shortDesc: "Professional academic writing with originality and accuracy.",
    icon: "📚",
    slug: "/project-thesis-assignment-writing",
  },
  {
    title: "Scholarship Consultancy",
    shortDesc: "Expert guidance to help you secure international scholarships.",
    icon: "🎓",
    slug: "/scholarship-consultancy",
  },
];

const ServicesSection = () => {
  return (
    <section className="container-fluid my-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl font-semibold text-gray-900">Our Services</h2>
          <p className="mt-2 text-gray-600">
            Solutions designed to help you grow faster and smarter.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Show all services */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-[#3AB1F3]
                       px-6 py-2.5 text-sm font-medium text-[#3AB1F3]
                       transition hover:bg-[#3AB1F3] hover:text-white"
          >
            Show all services
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
