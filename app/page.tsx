import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 py-12 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        SaaS Dashboard
      </h1>

      <p className="text-indigo-400 text-base sm:text-lg md:text-xl">
        Built for modern teams
      </p>

      <p className="max-w-xs sm:max-w-md md:max-w-xl text-slate-400 text-sm sm:text-base md:text-lg">
        Multi-tenant dashboard with role-based access, real-time analytics, and
        seamless team management.
      </p>

      <Link
        href="/signin"
        className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg transition-colors mt-2"
      >
        Sign In
      </Link>
    </div>
  );
}
