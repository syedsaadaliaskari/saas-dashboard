"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  BarChart2,
  User,
  LogOut,
} from "lucide-react";

export function Sidebar({ role }: { role?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = (
    <nav className="flex flex-col gap-1 flex-1">
      <Link
        href="/admin"
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 hover:bg-slate-700 px-3 py-2.5 rounded-lg transition-colors"
      >
        <LayoutDashboard size={18} />
        Dashboard
      </Link>

      {role === "ADMIN" && (
        <Link
          href="/admin/users"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 hover:bg-slate-700 px-3 py-2.5 rounded-lg transition-colors"
        >
          <Users size={18} />
          Users
        </Link>
      )}

      <Link
        href="/analytics"
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 hover:bg-slate-700 px-3 py-2.5 rounded-lg transition-colors"
      >
        <BarChart2 size={18} />
        Analytics
      </Link>

      <Link
        href={role === "ADMIN" ? "/admin" : "/user"}
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 hover:bg-slate-700 px-3 py-2.5 rounded-lg transition-colors"
      >
        <User size={18} />
        My Profile
      </Link>
    </nav>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full p-6 gap-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">SaaS Dashboard</h1>

        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {links}

      <button
        onClick={() => signOut({ callbackUrl: "/signin" })}
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-3 py-2.5 rounded-lg text-white transition-colors"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  );

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 right-4 z-50 bg-slate-800 text-white p-2 rounded-lg shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-slate-800 text-white flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>

      <div className="hidden md:flex min-h-screen w-64 bg-slate-800 text-white flex-col border-r border-slate-700">
        {sidebarContent}
      </div>
    </>
  );
}
