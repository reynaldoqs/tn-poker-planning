import { ButtonProps } from "./Button.types";

const sizeStyleMap: Record<Exclude<ButtonProps["size"], undefined>, string> = {
  lg: "rounded-xl py-3 px-8 text-lg font-black",
  md: "rounded-lg py-2 px-5 text-md font-bold",
  sm: "rounded-lg py-1 px-3 text-sm font-semibold",
};

export const Button: React.FC<ButtonProps> = ({
  title,
  size = "md",
  className,
  ...rest
}) => {
  return (
    <button
      className={`bg-primary active:opacity-40 ${sizeStyleMap[size]} ${className}`}
      {...rest}
    >
      {title}
    </button>
  );
};
