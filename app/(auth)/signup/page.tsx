"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.success) {
      router.push("/signin");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center flex-col min-h-screen px-4 py-8">
      <form
        className="bg-white shadow-md rounded-lg p-6 sm:p-8 text-black flex flex-col w-full max-w-sm sm:max-w-md gap-3"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl sm:text-2xl mb-2 text-black text-center">
          Please sign up here
        </h1>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="rounded shadow-sm outline-none p-2.5 w-full border border-gray-200 text-sm sm:text-base focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded shadow-sm outline-none p-2.5 w-full border border-gray-200 text-sm sm:text-base focus:ring-2 focus:ring-blue-300"
        />

        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="rounded shadow-sm outline-none p-2.5 w-full border border-gray-200 text-sm sm:text-base focus:ring-2 focus:ring-blue-300"
        />

        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          type="password"
          className="rounded shadow-sm outline-none p-2.5 w-full border border-gray-200 text-sm sm:text-base focus:ring-2 focus:ring-blue-300"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" className="w-full py-2.5 mt-1">
          Sign Up
        </Button>

        <p className="text-center text-sm sm:text-base text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
