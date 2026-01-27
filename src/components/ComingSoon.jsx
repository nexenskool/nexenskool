"use client";

import Link from "next/link";
import { Bell, Construction } from "lucide-react";

export default function ComingSoon({
  title = "Coming Soon",
  description = "This page is currently under development. We’re working hard to launch it soon.",
  primaryCta = { label: "Go Home", href: "/" },
  //   secondaryCta = { label: "Contact Support", href: "/contact" },
  features = [
    "Better experience & UI",
    "User-friendly dashboard",
    "More services & resources",
  ],
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center bg-[#2495ef]/10">
            <Construction className="w-7 h-7 text-[#2495ef]" />
          </div>

          <h2 className="text-3xl font-bold text-primary">{title}</h2>

          <p className="text-gray-500">{description}</p>
        </div>

        {/* Features */}
        {features?.length > 0 && (
          <div className="space-y-3">
            <p className="font-medium text-gray-700 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#2495ef]" />
              What&apos;s coming
            </p>

            <ul className="space-y-2">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2495ef]/10">
                    <span className="h-2 w-2 rounded-full bg-[#2495ef]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="grid gap-3">
          <Link
            href={primaryCta.href}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition text-center"
          >
            {primaryCta.label}
          </Link>

          {/* <Link
            href={secondaryCta.href}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition text-center"
          >
            {secondaryCta.label}
          </Link> */}
        </div>

        <p className="text-center text-gray-400 text-sm">
          Thanks for your patience ❤️
        </p>
      </div>
    </div>
  );
}
