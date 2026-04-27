"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

export default function OnBoarding() {
  const [companyname, setCompanyName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleCreate = async () => {
    const response = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyname }),
    });

    const data = await response.json();

    if (data.success) {
      await signOut({ redirect: false });
      await signIn("google", { callbackUrl: "/admin" });
    }
  };

  const handleJoin = async () => {
    const response = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode }),
    });

    const data = await response.json();

    if (data.success) {
      await signOut({ redirect: false });
      await signIn("google", { callbackUrl: "/user" });
    } else {
      setError("Invalid invite code. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 text-black flex items-center justify-center flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        Welcome, let's get you set up
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 flex flex-col md:flex-row items-stretch gap-4 w-full max-w-xs sm:max-w-lg md:max-w-2xl">
        <section className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-5 flex flex-col gap-3 flex-1">
          <h2 className="font-semibold text-sm sm:text-base text-gray-700">
            Create a new company
          </h2>
          <input
            type="text"
            value={companyname}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company name"
            className="outline-none w-full border-b border-gray-300 pb-2 text-sm sm:text-base focus:border-blue-400 bg-transparent"
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded text-white py-2 px-4 text-sm sm:text-base font-medium transition-colors mt-auto"
            onClick={handleCreate}
          >
            Create Company
          </button>
        </section>

        <div className="flex md:flex-col items-center justify-center gap-2">
          <div className="flex-1 h-px md:h-auto md:w-px bg-gray-300" />
          <span className="text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-1 h-px md:h-auto md:w-px bg-gray-300" />
        </div>

        <section className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-5 flex flex-col gap-3 flex-1">
          <h2 className="font-semibold text-sm sm:text-base text-gray-700">
            Join an existing company
          </h2>
          <input
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            type="text"
            placeholder="Enter invite code"
            className="outline-none w-full border-b border-gray-300 pb-2 text-sm sm:text-base focus:border-blue-400 bg-transparent"
          />
          <button
            onClick={handleJoin}
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded text-white py-2 px-4 text-sm sm:text-base font-medium transition-colors mt-auto"
          >
            Join Company
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </section>
      </div>
    </div>
  );
}
