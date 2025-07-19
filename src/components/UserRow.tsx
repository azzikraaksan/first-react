import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa6";

interface Props {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserRow({ user, onDelete }: Props) {
  const router = useRouter();

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 text-center align-middle w-[200px]">
        <img
          src={user.image_path}
          alt="Foto Profil"
          className="w-[100px] h-[100px] object-cover rounded-[10px] justify-center items-center"
        />
      </td>
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3 text-center align-middle">
        {user.pdf_path ? (
          <a
            href={user.pdf_path}
            // href={`${user.pdf_path}.pdf`}
            // href={`https://docs.google.com/viewer?url=${encodeURIComponent(user.pdf_path)}&embedded=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center"
          >
            <BiSolidFilePdf className="w-8 h-8 text-red-600" />
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="p-3 text-center align-middle">
        {user.excel_path ? (
          <a
            href={user.excel_path}
            // href={`https://docs.google.com/gview?url=${encodeURIComponent(user.excel_path)}&embedded=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center"
          >
            <FaFileExcel className="w-7 h-7 text-green-600" />
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="text-center w-[220px]">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => router.push(`/users/update/${user.id}`)}
            className="bg-[rgba(120,120,255,0.44)] hover:bg-[rgba(120,120,255,0.6)] text-[rgba(120,120,255,1)] rounded-md text-[12px] font-bold w-[60px] h-[30px]"
          >
            Edit
          </button>
          <button
            onClick={() => router.push(`/users/detail/${user.id}`)}
            className="bg-[rgba(0,111,255,0.44)] hover:bg-[rgba(0,111,255,0.6)] text-[rgba(0,111,255,1)] py-1 rounded-md text-[12px] font-bold w-[60px] h-[30px]"
          >
            Detail
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="bg-[rgba(255,0,0,0.23)] hover:bg-[rgba(255,0,0,0.4)] text-[rgba(255,0,0,1)] rounded-md text-[12px] font-bold w-[60px] h-[30px]"
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}
