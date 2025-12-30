"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import MobileDropdown from "../dropdown/MobileDropdown";

export const navItems = [
  {
    name: "Courses",
    path: "/courses",
  },
  {
    name: "Testimonial",
    path: "/testimonial",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export const servicesMenu = {
  title: "Services",
  items: [
    {
      name: "Custom Software Development",
      path: "/custom-software-development",
    },
    {
      name: "Project / Thesis / Assignment Writing",
      path: "/project-thesis-assignment-writing",
    },
    {
      name: "Scholarship Consultancy",
      path: "/scholarship-consultancy",
    },
  ],
};

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden">
        ☰
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-6 z-50"
          >
            <button
              onClick={() => setOpen(false)}
              className="mb-6 text-right w-full"
            >
              ✕
            </button>

            <MobileDropdown data={servicesMenu} />

            <ul className="space-y-3">
              {navItems.map((nav, index) => (
                <li key={index}>
                  <Link
                    href={nav.path}
                    className="block font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
