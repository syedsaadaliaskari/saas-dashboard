"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/onboarding",
    });
  };
  const loginWithGoogle = () =>
    signIn("google", { callbackUrl: "/onboarding" });
  return (
    <div className="bg-gray-100 flex items-center justify-center flex-col min-h-screen shadow-md">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded p-4 text-black flex items-center justify-center flex-col w-full max-w-md"
      >
        <h1 className="font-bold  text-2xl mb-4 text-black ">
          Please fill out and enjoy!
        </h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          className="rounded shadow-sm outline-none p-2 w-full mb-3"
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="rounded shadow-sm outline-none p-2 w-full"
        />
        <button className="rounded bg-blue-400 text-white shadow-md px-2 mt-3 ">
          SignIn
        </button>

        <span>
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            SignUp
          </Link>
        </span>
      </form>

      <span className="mt-3 text-black mb-3 ">OR</span>

      <button
        type="button"
        onClick={loginWithGoogle}
        className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 text-black font-medium shadow-sm"
      >
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
