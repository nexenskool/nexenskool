"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useGetServicesQuery } from "@/store/api/adminServiceApi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const { data, isLoading, isError } = useGetServicesQuery();
  const services = data?.services ?? [];

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.webp"
              alt="YourLogo"
              width={120}
              height={40}
              priority
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <li className="relative group">
              {services.length > 0 && (
                <button className="flex items-center gap-1 py-2 hover:text-[#2495ef] transition">
                  Services <ChevronDown size={16} />
                </button>
              )}

              <div className="absolute left-0 top-full p-2 hidden w-64 rounded-xl bg-white shadow-lg border border-gray-100 group-hover:block">
                {isLoading && (
                  <p className="px-4 py-3 text-sm text-gray-500">
                    Loading services...
                  </p>
                )}

                {isError && (
                  <p className="px-4 py-3 text-sm text-red-500">
                    Failed to load services
                  </p>
                )}

                {!isLoading &&
                  services.length > 0 &&
                  services.map((service) => (
                    <Link
                      key={service._id}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-[#2495ef]/10 hover:text-[#2495ef] transition"
                    >
                      {service.name}
                    </Link>
                  ))}
              </div>
            </li>

            <NavItem href="/scholarship" label="Scholarship" />
            {/* <NavItem href="/courses" label="Courses" /> */}
            <NavItem href="/blog" label="Blog" />
            <NavItem href="/testimonial" label="Testimonials" />
          </ul>

          <Link
            href="/login"
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#2495ef] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1f86d6] transition shadow-sm"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-gray-700 hover:text-[#2495ef]"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)} // click outside closes menu
      >
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-xl p-6 flex flex-col transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setMenuOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-base font-medium text-gray-700">
            {/* Services Accordion */}
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between py-2 w-full hover:text-[#2495ef] transition"
            >
              Services
              {servicesOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {servicesOpen && (
              <div className="ml-3 mt-2 flex flex-col gap-2 border-l border-gray-200 pl-3">
                {isLoading && (
                  <p className="text-gray-500 text-sm">Loading...</p>
                )}
                {isError && (
                  <p className="text-red-500 text-sm">Failed to load</p>
                )}
                {!isLoading &&
                  services.map((service) => (
                    <Link
                      key={service._id}
                      href={`/services/${service.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-600 hover:text-[#2495ef] transition py-2"
                    >
                      {service.name}
                    </Link>
                  ))}
              </div>
            )}

            <MobileLink href="/blog" label="Blog" close={setMenuOpen} />
            <MobileLink
              href="/scholarship"
              label="Scholarship"
              close={setMenuOpen}
            />
            <MobileLink href="/courses" label="Courses" close={setMenuOpen} />
            <MobileLink
              href="/testimonial"
              label="Testimonials"
              close={setMenuOpen}
            />
          </nav>

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-auto rounded-lg bg-[#2495ef] px-5 py-3 text-center text-base font-semibold text-white hover:bg-[#1f86d6] transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, label }) {
  return (
    <li>
      <Link href={href} className="hover:text-[#2495ef] transition">
        {label}
      </Link>
    </li>
  );
}

function MobileLink({ href, label, close }) {
  return (
    <Link
      href={href}
      onClick={() => close(false)}
      className="hover:text-[#2495ef] py-2 block"
    >
      {label}
    </Link>
  );
}
