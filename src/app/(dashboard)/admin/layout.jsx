"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Layers,
  FileText,
  MessageSquare,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Services", href: "/admin/services", icon: Layers },
    { label: "Sub Services", href: "/admin/sub-services", icon: Layers },
    { label: "Blogs", href: "/admin/blogs", icon: FileText },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Scholarships", href: "/admin/scholarships", icon: BookOpen },
    { label: "Users", href: "/admin/users", icon: Users },
  ];

  const isActive = (href) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 bg-gray-900 text-white",
          "transition-all duration-300",
          "border-r border-white/10",
          // width rules
          collapsed ? "md:w-20" : "md:w-64",
          // mobile slide in/out
          sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72",
          "md:translate-x-0",
        ].join(" ")}
      >
        {/* Mobile top row */}
        <div className="flex items-center justify-between px-5 py-4 md:hidden border-b border-white/10">
          <span className="text-lg font-bold">Admin</span>
          <button onClick={() => setSidebarOpen(false)} className="opacity-90">
            <X size={22} />
          </button>
        </div>

        {/* Brand + collapse toggle (desktop) */}
        <div className="hidden md:flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-[#2495ef]/15 flex items-center justify-center text-[#2495ef] font-bold">
              N
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <p className="font-semibold">Admin Panel</p>
                <p className="text-xs text-gray-400">NexenSkool</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed((p) => !p)}
            className="h-9 w-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={[
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition",
                  active
                    ? "bg-[#2495ef] text-white shadow-sm"
                    : "text-gray-200 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <Icon size={20} className="shrink-0" />

                {/* Label */}
                {!collapsed && (
                  <span className="text-sm font-medium">{label}</span>
                )}

                {/* active pill indicator for collapsed mode */}
                {collapsed && active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/images/avatar.png"
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover border border-white/10"
            />
            {!collapsed && (
              <div className="leading-tight">
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-gray-400">Manage platform</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div
        className={[
          "transition-all duration-300",
          collapsed ? "md:pl-20" : "md:pl-64",
        ].join(" ")}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
          <div className="px-4 md:px-6 py-3 flex items-center justify-between">
            <button
              className="md:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#2495ef]/10 text-[#2495ef] flex items-center justify-center font-bold md:hidden">
                N
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-semibold text-gray-900">
                  {navItems.find((n) => isActive(n.href))?.label || "Dashboard"}
                </h1>
                <p className="hidden sm:block text-xs text-gray-500">
                  Control center for your website
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-gray-600">
                Admin
              </span>
              <img
                src="/images/avatar.png"
                alt="Avatar"
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
