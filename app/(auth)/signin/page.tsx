import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center flex-col min-h-screen shadow-md">
      <form className="bg-gray-100 shadow-md rounded p-4 text-black flex items-center justify-center flex-col w-full max-w-md">
        <h1 className="font-bold  text-2xl mb-4 text-black ">
          Please fill out and enjoy!
        </h1>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="rounded shadow-sm outline-none p-2 w-full mb-3"
        />
        <input
          placeholder="password"
          type="password"
          className="rounded shadow-sm outline-none p-2 w-full"
        />
        <button className="rounded bg-blue-400 text-white shadow-md px-2 mt-1.5">
          SignIn
        </button>

        <span>
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            SignUp
          </Link>
        </span>
      </form>
    </div>
  );
}
