"use client";

export function CopyButton({ code }: { code: string }) {
  return (
    <div>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="mt-2 bg-white text-violet-600 rounded px-3 py-1 text-sm font-medium hover:bg-gray-100"
      >
        Copy Code
      </button>
    </div>
  );
}
