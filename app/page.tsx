import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-5xl font-bold text-center">SaaS Dashboard</h1>
      <p className="text-indigo-400 text-xl">Built for modern teams</p>
      <p className="text-center max-w-xl text-slate-400 text-lg">
        Multi-tenant dashboard with role-based access, real-time analytics, and
        seamless team management.
      </p>
      <Link
        href="/signin"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium text-lg"
      >
        SignIn
      </Link>
    </div>
  );
}
