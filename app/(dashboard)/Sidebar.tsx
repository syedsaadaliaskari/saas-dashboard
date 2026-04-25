"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export function Sidebar() {
  return (
    <div className="min-h-screen w-64 bg-slate-800 text-white flex flex-col p-6 gap-4 border-r border-slate-700">
      <h1 className="text-xl font-bold mb-6">SaaS Dashboard</h1>

      <nav className="flex flex-col gap-3 flex-1">
        <Link href="/admin" className="hover:bg-slate-700 px-3 py-2 rounded">
          Dashboard
        </Link>
        <Link href="/user" className="hover:bg-slate-700 px-3 py-2 rounded">
          My Profile
        </Link>
        <Link
          href="/admin/users"
          className="hover:bg-slate-700 px-3 py-2 rounded"
        >
          Users
        </Link>
        <Link
          href="/analytics"
          className="hover:bg-slate-700 px-3 py-2 rounded"
        >
          Analytics
        </Link>
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/signin" })}
        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white"
      >
        Sign Out
      </button>
    </div>
  );
}
