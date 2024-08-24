type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` ${disabled? "border-gray-600 text-gray-600  cursor-not-allowed":"text-blue-500 border-blue-500 cursor-pointer hover:border-blue-700  focus:border-blue-600 focus:bg-blue-50/50 focus:text-blue-600 focus:outline-none focus:ring-0 active:border-blue-700 active:text-blue-700  hover:bg-blue-950 focus:bg-blue-950 motion-reduce:transition-none"} inline-block  rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out   ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
