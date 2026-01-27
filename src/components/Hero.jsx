"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[#2495ef]/20 to-[#1f86d6]/10 overflow-hidden">
      <div className="container-fluid mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between min-h-[80vh]">
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Bridging Education &{" "}
            <span className="text-[#2495ef]">Technology</span>
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl">
            NexenSkool empowers learners and organizations with practical tech
            skills, custom software solutions, professional training, research
            guidance, and consultancy—all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/login"
              className="inline-block rounded-lg bg-[#2495ef] px-6 py-3 text-white font-semibold text-lg hover:bg-[#1f86d6] transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="inline-block rounded-lg border border-[#2495ef] px-6 py-3 text-[#2495ef] font-semibold text-lg hover:bg-[#2495ef]/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 mb-8 md:mb-0 relative">
          <Image
            src="/images/hero.webp"
            alt="Education and Technology Illustration"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-[#2495ef]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#1f86d6]/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
    </section>
  );
}
