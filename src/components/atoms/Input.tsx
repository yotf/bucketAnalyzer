import React from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  className,
  error,
}) => {
  return (
    <div className=" relative mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full transition-all px-3 py-2 bg-zinc-900 rounded-md shadow-sm ${error ? "border-red-500  focus:border-red-500" : "focus:border-blue-500 border-transparent"} outline-none  border  sm:text-sm ${className}`}
      />
      {error && (
        <div className="absolute left-0 top-full mt-1 w-full bg-red-500 text-white text-xs rounded-md p-2 shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
