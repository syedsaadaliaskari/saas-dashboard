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
      setError("Password does not match");

      return;
    }
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    <div className="bg-gray-100 flex items-center justify-center flex-col min-h-screen shadow-md ">
      <form
        className="bg-gray-100 shadow-md rounded p-4 text-black flex flex-col items-center justify-center w-full max-w-md p-8 gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold  text-2xl mb-4 text-black ">
          Please signUp here
        </h1>
        <input
          placeholder="Write your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="rounded shadow-sm outline-none p-2 w-full mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded shadow-sm outline-none p-2 w-full mb-3"
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="rounded shadow-sm outline-none p-2 w-full mb-3"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          type="password"
          className="rounded shadow-sm outline-none p-2 w-full mb-3"
        />

        <Button>SignUp</Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div>
        <span>
          Already had account?{" "}
          <Link href={"/signin"} className="text-blue-500">
            SignIn
          </Link>
        </span>
      </div>
    </div>
  );
}
