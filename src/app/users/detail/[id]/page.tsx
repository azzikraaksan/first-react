"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getUserById } from "@/lib/api";
import { STORAGE_URL } from "@/constants/config";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa6";

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const userId = Array.isArray(id) ? Number(id[0]) : Number(id);
interface User {
  id: number;
  name: string;
  email: string;
  image_path: string;
  pdf_path: string | null;
  excel_path: string | null;
}

const [user, setUser] = useState<User | null>(null);

  // const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(userId);
        setUser(res.data as User);
      } catch (err) {
        console.error("Gagal ambil data user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat detail pengguna...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Data pengguna tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 font-sans bg-white">
      <button
          onClick={() => router.back()}
          className="bg-[rgba(120,120,255,0.72)] hover:bg-[rgba(120,120,255,0.8)] text-white px-4 py-2 rounded-md font-medium shadow"
        >
          ← Kembali
        </button>

      <div style={{ borderWidth: 4 }} className="mt-5 bg-white border border-[#7878FF] border-opacity-30 shadow-lg rounded-md p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={user.image_path}
            alt="Foto Profil"
            className="w-[245px] h-[245px] object-cover rounded-md"
          />
          <div className="flex-1 space-y-5">
            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-1">
                Nama
              </label>
              <div className="bg-[#E5E5FF] px-4 py-2 rounded-md">
                {user.name}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-1">
                Email
              </label>
              <div className="bg-[#E5E5FF] px-4 py-2 rounded-md">
                {user.email}
              </div>
            </div>
            <div className="flex gap-8 mt-4">
              <div className="">
                <p className="text-sm mb-1 font-medium">PDF</p>
                {user.pdf_path ? (
                  <a
                    href={user.pdf_path}
                    target="_blank"
                    className="inline-flex justify-center items-center bg-[#E5E5FF] w-[80px] h-[40px] rounded"
                  >
                    <BiSolidFilePdf className="text-red-600 w-7 h-7" />
                  </a>
                ) : (
                  <p className="text-gray-400">-</p>
                )}
              </div>
              <div className="">
                <p className="text-sm mb-1 font-medium">Excel</p>
                {user.excel_path ? (
                  <a
                    href={user.excel_path}
                    target="_blank"
                    className="inline-flex justify-center items-center bg-[#E5E5FF] w-[80px] h-[40px] rounded"
                  >
                    <FaFileExcel className="text-green-600 w-6 h-6" />
                  </a>
                ) : (
                  <p className="text-gray-400">-</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
