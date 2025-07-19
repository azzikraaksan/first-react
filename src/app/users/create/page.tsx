"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/api";
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

export default function CreateUserPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

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
      if (val) formData.append(key, val);
    });

    try {
      await createUser(formData);
      router.push("/users");
    } catch (err) {
      console.error("Gagal tambah user:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-5 py-6 font-sans bg-gradient-to-br from-[rgba(244,139,123,0.24)] via-[rgba(120,120,255,0.72)] to-[rgba(174,65,247,0.49)]">
      <h2 className="text-[32px] font-bold mb-6 text-gray-750 items-center text-center">
        Tambah Pengguna Baru
      </h2>
      <div
        className="max-w-xl mx-auto bg-[#FFECEC] p-8 rounded-lg shadow-md border"
        style={{ borderColor: "#662691", borderWidth: "5px" }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FileInput
            label="Upload Foto Profil (Maks 1 MB)"
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
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <FileInput
            label="File PDF (Maks 4 MB)"
            name="pdf"
            accept=".pdf,application/pdf"
            onChange={handleChange}
          />
          <FileInput
            label="File Excel (Maks 4 MB)"
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
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
