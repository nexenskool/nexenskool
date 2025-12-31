import { notFound } from "next/navigation";
import Link from "next/link";

export const services = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDesc:
      "Scalable web and mobile solutions tailored to your business needs.",
    overview:
      "We design and develop custom software solutions that help businesses automate processes, improve efficiency, and scale confidently.",
    features: [
      "Web & Mobile Application Development",
      "Enterprise Software Solutions",
      "API & System Integrations",
      "Scalable & Secure Architecture",
    ],
  },
  {
    slug: "project-thesis-assignment-writing",
    title: "Project / Thesis / Assignment Writing",
    shortDesc: "Professional academic writing with originality and accuracy.",
    overview:
      "Our academic writing services help students and researchers submit high-quality, plagiarism-free work on time.",
    features: [
      "Original & Plagiarism-Free Content",
      "Proper Formatting & Referencing",
      "On-Time Delivery",
      "Revisions Included",
    ],
  },
  {
    slug: "scholarship-consultancy",
    title: "Scholarship Consultancy",
    shortDesc: "Expert guidance to help you secure international scholarships.",
    overview:
      "We guide students through the complete scholarship application process with personalized consultation.",
    features: [
      "University & Scholarship Selection",
      "SOP & Document Review",
      "Interview Preparation",
      "End-to-End Guidance",
    ],
  },
];

const ServiceDetails = async ({ params }) => {
  const { slug } = await params;

  const service = services.find((item) => item.slug === slug);

  if (!service) return notFound();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#3AB1F3]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/services" className="hover:text-[#3AB1F3]">
            Services
          </Link>{" "}
          / <span className="text-gray-900">{service.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="mb-3 text-4xl font-semibold text-gray-900">
            {service.title}
          </h1>
          <p className="max-w-2xl text-lg text-gray-600">{service.shortDesc}</p>
        </header>

        {/* Overview */}
        <div className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">{service.overview}</p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            What we offer
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 rounded-lg border border-gray-200 p-3"
              >
                <span className="mt-1 text-[#3AB1F3]">✔</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-[#3AB1F3]/10 p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Interested in this service?
          </h3>
          <p className="mb-4 text-gray-600">
            Let’s discuss your requirements and find the best solution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-[#3AB1F3]
                       px-6 py-2.5 font-medium text-white transition
                       hover:bg-[#2599DA]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
