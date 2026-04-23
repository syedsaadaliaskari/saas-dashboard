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
      router.push("/dashboard/admin");
    }
  };
  return (
    <div>
      <h1>Welcome, lets get you set up</h1>

      <div>
        <input
          type="text"
          value={companyname}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="write company name"
        />
        <button onClick={handleCreate}>Create Company</button>
      </div>
      <span>OR</span>
      <div>
        <input type="text" placeholder="Enter invite code" />
        <button>Join company</button>
      </div>
    </div>
  );
}
