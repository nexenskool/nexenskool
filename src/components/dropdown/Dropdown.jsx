"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const dropdownVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Dropdown = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="font-medium">{data.title}</button>

      <AnimatePresence>
        {open && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md min-w-60 z-50"
          >
            {data.items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
