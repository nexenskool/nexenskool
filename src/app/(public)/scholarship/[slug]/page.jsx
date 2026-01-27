"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetScholarshipsQuery } from "@/store/api/scholarshipApi";

export default function ScholarshipDetailsPage() {
  const { slug } = useParams();

  const { data, isLoading, isError } = useGetScholarshipsQuery();

  const scholarship = data?.scholarships?.find((item) => item.slug === slug);

  if (isLoading) {
    return (
      <p className="text-center py-20 text-gray-500 text-lg">
        Loading scholarship...
      </p>
    );
  }

  if (isError || !scholarship) {
    return (
      <p className="text-center py-20 text-red-500 text-lg">
        Scholarship not found.
      </p>
    );
  }

  return (
    <article className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <img
          src={scholarship.image}
          alt={scholarship.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        {/* Back */}
        <Link
          href="/scholarship"
          className="text-[#2495ef] font-medium hover:underline mb-6 inline-block"
        >
          ← Back to Scholarships
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {scholarship.name}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-gray-600 mb-8">
          <span>
            <strong>Location:</strong> {scholarship.location}
          </span>
          <span>
            <strong>Degrees:</strong> {scholarship.degrees.join(", ")}
          </span>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none text-gray-700">
          {scholarship.description?.split("\n\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        {/* Benefits */}
        {scholarship.benefits && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
            <p className="text-gray-700">{scholarship.benefits}</p>
          </div>
        )}

        {/* CTA */}
        {scholarship.applyUrl && (
          <div className="mt-12">
            <a
              href={scholarship.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#2495ef] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1f86d6] transition"
            >
              Apply Now
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
