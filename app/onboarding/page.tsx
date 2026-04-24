"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnBoarding() {
  const [companyname, setCompanyName] = useState("");

  const router = useRouter();

  const handleCreate = async () => {
    const response = await fetch(
      "/api/onboarding",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyname: companyname }),
      },
    );

    const data = await response.json();

    if (data.success) {
      router.push("/admin");
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-100 text-black flex items-center justify-center flex-col gap-6  ">
      <h1 className="text-3xl font-bold">Welcome, lets get you set up</h1>
      <div className="bg-gray-100 flex items-center flex-col md:flex-row gap-2 shadow-lg p-10  ">
        <section className="bg-gray-200 shadow-sm w-full md:w-80 p-5 rounded ">
          <input
            type="text"
            value={companyname}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="write company name"
            className="outline-none w-full pb-3 "
          />
          <button
            className="pl-3 bg-blue-500 rounded text-white py-1 text-center px-1  "
            onClick={handleCreate}
          >
            Create Company
          </button>
        </section>

        <span>OR</span>

        <section className="bg-gray-200 shadow-sm  p-5 rounded w-full md:w-80">
          <input
            type="text"
            className="outline-none w-full pb-3 "
            placeholder="Enter invite code"
          />
          <button className="pl-3 bg-blue-500 rounded text-white py-1 text-center px-1  ">
            Join company
          </button>
        </section>
      </div>
    </div>
  );
}
