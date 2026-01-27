import BlogsSection from "@/components/BlogsSection";
import ContactButton from "@/components/ContactButton";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServiceSection";
import TestimonialsSection from "@/components/TestimonialSection";
import React from "react";

const Home = () => {
  return (
    <>
      <ContactButton />
      <Hero />
      <ServicesSection />
      <BlogsSection />
      <TestimonialsSection />
      {/* <ContactSection /> */}
    </>
  );
};

export default Home;
