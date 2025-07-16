interface FileInputProps {
  label: string;
  name: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({
  label,
  name,
  accept,
  onChange,
}: FileInputProps) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        className="w-full cursor-pointer"
      />
    </div>
  );
}
