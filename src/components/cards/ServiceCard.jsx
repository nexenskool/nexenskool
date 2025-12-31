import Link from "next/link";

const ServiceCard = ({ service }) => {
  return (
    <div
      className="group relative block rounded-2xl border border-gray-200 bg-white p-6 transition
                 hover:shadow-md hover:border-[#3AB1F3]"
    >
      {/* Arrow */}
      <Link
        href={`/services${service.slug}`}
        className="absolute right-4 top-4 text-gray-400 transition
                   group-hover:text-[#3AB1F3]"
      >
        →
      </Link>

      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3AB1F3]/10 text-xl">
        {service.icon}
      </div>

      {/* Content */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        {service.title}
      </h3>

      <p className="text-sm text-gray-600">{service.shortDesc}</p>
    </div>
  );
};

export default ServiceCard;
