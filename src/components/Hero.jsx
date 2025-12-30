import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 container-fluid min-h-screen lg:min-h-[70vh] order py-10">
      <div className="left flex-1 lg:order-1 order-2 flex flex-col gap-5 lg:justify-center">
        <h2 className="font-medium text-4xl tracking-tight flex flex-col gap-1">
          Cutting-edge software solutions,
          <span className="block font-semibold text-5xl">
            Research-driven academic support,
          </span>
          Global education pathways
        </h2>
        <p>
          From custom software development and career-focused courses to study
          abroad consultancy, projects, thesis, and research paper writing, we
          help you move from idea to impact.
        </p>
      </div>
      <div className="right flex-1 relative order-1 lg:order-2 rounded-xl">
        <Image
          src={"/hero.webp"}
          alt="hero"
          fill
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Hero;
