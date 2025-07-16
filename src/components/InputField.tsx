interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  required,
}: InputFieldProps) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-[#FFECEC] w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
