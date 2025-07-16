"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/lib/api";
import InputField from "@/components/InputField";
import FileInput from "@/components/FileInput";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  image: null as File | null,
  pdf: null as File | null,
  excel: null as File | null,
};

export default function UpdateUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Array.isArray(params.id)
    ? Number(params.id[0])
    : Number(params.id);

  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(userId);
        const data = res.data;

        setForm((prev) => ({
          ...prev,
          name: data.name,
          email: data.email,
        }));
      } catch (err) {
        console.error("Gagal ambil data user:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val) formData.append(key, val as string | Blob);
    });

    try {
      await updateUser(userId, formData);
      router.push("/users");
    } catch (err) {
      console.error("Gagal update user:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-5 py-6 font-sans bg-gradient-to-br from-[rgba(244,139,123,0.24)] via-[rgba(120,120,255,0.72)] to-[rgba(174,65,247,0.49)]">
      <h2 className="text-[32px] font-bold mb-6 text-gray-750 items-center text-center">
        Edit Pengguna
      </h2>

      <div
        className="max-w-xl mx-auto bg-[#FFECEC] p-8 rounded-lg shadow-md border"
        style={{ borderColor: "#662691", borderWidth: "5px" }}
      >
        {fetching ? (
          <p className="text-center text-gray-500">Memuat data pengguna...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <FileInput
              label="Upload Foto Profil"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            <InputField
              label="Nama"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <FileInput
              label="File PDF"
              name="pdf"
              accept="application/pdf"
              onChange={handleChange}
            />
            <FileInput
              label="File Excel"
              name="excel"
              accept=".xlsx,.xls"
              onChange={handleChange}
            />

            <div className="flex justify-end gap-2 items-center mt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-white bg-[#9D9D9D] hover:bg-[#7C7C7C] py-1 px-4 rounded-[5px]"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`bg-[rgba(120,120,255,0.7)] hover:bg-[rgba(120,120,255,0.9)] text-white px-4 py-1 rounded-[5px] ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
