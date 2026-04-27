"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Sidebar({ role }: { role?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = (
    <nav className="flex flex-col gap-3 flex-1">
      <Link
        href="/admin"
        onClick={() => setIsOpen(false)}
        className="hover:bg-slate-700 px-3 py-2 rounded"
      >
        Dashboard
      </Link>
      {role === "ADMIN" && (
        <Link
          href="/admin/users"
          onClick={() => setIsOpen(false)}
          className="hover:bg-slate-700 px-3 py-2 rounded"
        >
          Users
        </Link>
      )}
      <Link
        href="/analytics"
        onClick={() => setIsOpen(false)}
        className="hover:bg-slate-700 px-3 py-2 rounded"
      >
        Analytics
      </Link>
      <Link
        href="/user"
        onClick={() => setIsOpen(false)}
        className="hover:bg-slate-700 px-3 py-2 rounded"
      >
        My Profile
      </Link>
    </nav>
  );

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-slate-800 text-white flex flex-col p-6 gap-4 z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h1 className="text-xl font-bold mb-6 mt-8">SaaS Dashboard</h1>
        {links}
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white"
        >
          Sign Out
        </button>
      </div>

      <div className="hidden md:flex min-h-screen w-64 bg-slate-800 text-white flex-col p-6 gap-4 border-r border-slate-700">
        <h1 className="text-xl font-bold mb-6">SaaS Dashboard</h1>
        {links}
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white"
        >
          Sign Out
        </button>
      </div>
    </>
  );
}
