"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, deleteUser } from "@/lib/api";
import type { User } from "@/types/user";
import UserRow from "@/components/UserRow";
import LoadingRow from "@/components/LoadingRow";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 font-sans">
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-[rgba(120,120,255,0.72)] hover:bg-[rgba(120,120,255,0.8)] text-white px-4 py-2 rounded-md font-medium shadow"
        >
          ← Kembali ke Dashboard
        </button>
        <button
          onClick={() => router.push("/users/create")}
          className="bg-[rgba(120,120,255,0.72)] hover:bg-[rgba(120,120,255,0.8)] text-white px-4 py-2 rounded-md font-medium shadow"
        >
          + Tambah User
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Daftar Pengguna</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-md">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="text-center p-3">Foto Profil</th>
              <th className="text-left p-3">Nama</th>
              <th className="text-left p-3">Email</th>
              <th className="text-center p-3">PDF</th>
              <th className="text-center p-3">Excel</th>
              <th className="text-center p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <LoadingRow colCount={6} />
              </>
            ) : users.length > 0 ? (
              users.map((user) => (
                <UserRow key={user.id} user={user} onDelete={handleDelete} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Belum ada data user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
