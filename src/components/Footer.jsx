"use client";

import Link from "next/link";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useGetServicesQuery } from "@/store/api/adminServiceApi";

export default function Footer() {
  const { data, isLoading, isError } = useGetServicesQuery();
  const services = data?.services || [];

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Top border glow-ish */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2495ef]/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / About */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-bold text-white">NexenSkool</span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#2495ef]/15 text-[#2495ef] font-semibold">
                Learn • Build • Grow
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Bridging the gap between education and practical technology
              skills. We provide software development, academic guidance,
              professional training, and consultancy.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <SocialIcon href="#" label="Facebook">
                <Facebook size={18} />
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <Twitter size={18} />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <Instagram size={18} />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <Linkedin size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Services (dynamic) */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Services</h4>

            {isLoading ? (
              <ul className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <li
                    key={i}
                    className="h-4 bg-gray-800 rounded animate-pulse w-11/12"
                  />
                ))}
              </ul>
            ) : isError ? (
              <p className="text-sm text-red-400">Failed to load services.</p>
            ) : services.length === 0 ? (
              <p className="text-sm text-gray-400">
                No services available yet.
              </p>
            ) : (
              <ul className="space-y-2 text-sm max-h-40 overflow-auto pr-1">
                {services.map((service) => (
                  <li key={service._id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-gray-300 hover:text-[#2495ef] transition underline-offset-4 hover:underline"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact / CTA */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Get in touch</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Have a question or want to work with us? Send a message and we’ll
              reply soon.
            </p>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#2495ef] px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Contact Us
            </Link>

            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-lg border border-gray-800 bg-transparent px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-gray-900 transition"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} NexenSkool. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- small helpers ---- */

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-300 hover:text-[#2495ef] transition underline-offset-4 hover:underline"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="h-10 w-10 rounded-xl border border-gray-800 bg-gray-900/40 flex items-center justify-center text-gray-300 hover:text-[#2495ef] hover:border-[#2495ef]/40 transition"
    >
      {children}
    </Link>
  );
}
