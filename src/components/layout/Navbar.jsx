import Image from "next/image";
import Link from "next/link";
import Dropdown from "../ui/dropdown/Dropdown";
import MobileNav from "./MobileNav";

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

const Navbar = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 md:px-12">
      {/* Logo */}
      <Link href="/" className="relative w-40 h-12">
        <Image
          src="/logo.webp"
          alt="logo"
          fill
          className="object-contain"
          priority
        />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        <Dropdown data={servicesMenu} />

        {navItems.map((nav, index) => (
          <Link key={index} href={nav.path} className="font-medium">
            {nav.name}
          </Link>
        ))}
      </div>

      {/* Mobile */}
      <MobileNav />
    </nav>
  );
};

export default Navbar;
