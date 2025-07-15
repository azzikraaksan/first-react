"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-100"
        style={{
          background: `radial-gradient(250px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.07), transparent 80%)`,
        }}
      />

      <div className="relative z-10 text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Selamat Datang 👋
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Ini adalah tampilan sederhana menggunakan Next.js dan Tailwind CSS. Klik tombol di bawah ini untuk melihat data pengguna.
        </p>
        <button
          onClick={() => router.push("/users")}
          className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 -ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5V4H2v16h5m10 0l-4-4m0 0l-4 4m4-4v12"
            />
          </svg>
          Lihat Data Pengguna
        </button>
      </div>
    </div>
  );
}
