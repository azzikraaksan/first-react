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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[rgba(244,139,123,0.24)] via-[rgba(120,120,255,0.72)] to-[rgba(174,65,247,0.49)] px-4">
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-100"
        style={{
          background: `radial-gradient(250px at ${pos.x}px ${pos.y}px, rgba(136, 14, 79, 0.2), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex items-center justify-center bg-white bg-opacity-70 rounded-[50px] p-6 md:p-12 shadow-2xl max-w-6xl w-[900px] h-[500px] gap-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(229,76,145,0.39)_0%,_rgba(244,139,123,0.24)_100%,_rgba(244,139,123,1)_100%)]" />
        <div className="relative z-10 flex-1 flex justify-center items-center">
          <img
            src="/assets/asset4.png"
            className="absolute top-[-50px] left-[150px] w-[250px]"
            alt="dekorasi 1"
          />
            <img
              src="/assets/asset5.png"
              className="absolute bottom-[-50px] left-[-70px] w-[180px]"
              alt="dekorasi 1"
            />
          <div className="relative w-[160px] h-[400px]">
            <div className="left-[-170px] top-[-50px] h-[500px] rounded-[50px] absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(216,153,182,1)_0%,_rgba(255,124,104,0.07)_100%,_rgba(255,124,104,0.07)_100%)] w-[400px]" />
            <img
              src="/assets/asset3.png"
              className="absolute top-[-30px] left-[-120px]"
              alt="dekorasi 1"
            />
            <img
              src="/assets/asset2.png"
              className="absolute w-[150px] top-[80px] left-[160px]"
              alt="dekorasi 2"
            />
            <img
              src="/assets/asset1.png"
              className="absolute bottom-0 right-0 left-[-80px]"
              alt="dekorasi 3"
            />
          </div>
        </div>

        <div className="relative z-10 flex-1 text-center space-y-6 font-inter font-semibold text-black">
          <h1 className="text-[24px] font-semibold">
            Heyyhoooo{" "}
            <span className="bg-gradient-to-r from-[#F7AD50] to-[#EB4335] bg-clip-text text-transparent">
              Welcome!
            </span>{" "}
            👋
          </h1>
          <p className="text-[24px]">
            Here’s your classic dashboard to <br /> explore user data✨
          </p>
          <button
            onClick={() => router.push("/users")}
            className="inline-flex items-center gap-2 border border-black text-sm px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A4 4 0 016 16h12a4 4 0 01.879.121M12 12a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
            Lihat Data Pengguna
          </button>
        </div>
      </div>
    </div>
  );
}
