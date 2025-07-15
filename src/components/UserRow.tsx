import { User } from "@/types/user";
import { STORAGE_URL } from "@/constants/config";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserRow({ user, onDelete }: Props) {
  const router = useRouter();

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">
        {user.image_path ? (
          <img
            src={`${STORAGE_URL}/${user.image_path}`}
            alt="Foto Profil"
            className="w-20 h-auto object-cover rounded-md"
          />
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">
        {user.pdf_path ? (
          <a
            href={`${STORAGE_URL}/${user.pdf_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            📄 PDF
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="p-3">
        {user.excel_path ? (
          <a
            href={`${STORAGE_URL}/${user.excel_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            📊 Excel
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="p-3 text-center">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => router.push(`/users/${user.id}/edit`)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Edit
          </button>
          <a
            href={`${STORAGE_URL}/${user.image_path}`}
            target="_blank"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Lihat
          </a>
          <button
            onClick={() => onDelete(user.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}
