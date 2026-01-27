"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useGetScholarshipsQuery } from "@/store/api/scholarshipApi";

export default function ScholarshipPage() {
  const { data, isLoading, isError } = useGetScholarshipsQuery();
  const scholarships = data?.scholarships || [];

  // Filters state
  const [search, setSearch] = useState("");
  const [degree, setDegree] = useState("all");
  const [location, setLocation] = useState("all");

  // Unique filter options
  const degrees = useMemo(
    () => ["all", ...new Set(scholarships.flatMap((s) => s.degrees))],
    [scholarships]
  );

  const locations = useMemo(
    () => ["all", ...new Set(scholarships.map((s) => s.location))],
    [scholarships]
  );

  // Filtered data
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDegree =
        degree === "all" || item.degrees.includes(degree);

      const matchesLocation =
        location === "all" || item.location === location;

      return matchesSearch && matchesDegree && matchesLocation;
    });
  }, [scholarships, search, degree, location]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Scholarships
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore available scholarships and opportunities to support your
            academic journey
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <input
            type="text"
            placeholder="Search scholarship..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2495ef] outline-none"
          />

          {/* Degree */}
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-300 bg-white"
          >
            {degrees.map((d) => (
              <option key={d} value={d}>
                {d === "all" ? "All Degrees" : d}
              </option>
            ))}
          </select>

          {/* Location */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-300 bg-white"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === "all" ? "All Locations" : loc}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">
            Failed to load scholarships.
          </p>
        ) : filteredScholarships.length === 0 ? (
          <p className="text-center text-gray-500">
            No scholarships match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScholarships.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </h2>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {item.location}
                    </p>
                    <p>
                      <span className="font-medium">Degrees:</span>{" "}
                      {item.degrees.join(", ")}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-3">
                    {item.benefits}
                  </p>

                  {/* Actions */}
                  <div className="mt-auto flex items-center justify-between">
                    <Link
                      href={`/scholarship/${item.slug}`}
                      className="text-[#2495ef] font-medium hover:underline"
                    >
                      View Details →
                    </Link>

                    {item.applyUrl && (
                      <a
                        href={item.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white bg-[#2495ef] px-4 py-2 rounded-lg hover:opacity-90"
                      >
                        Apply
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
