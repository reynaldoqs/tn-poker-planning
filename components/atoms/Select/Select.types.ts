import { SelectProps as PrimitiveSelectProps } from "@radix-ui/react-select";

export type SelectProps = PrimitiveSelectProps & {
  options: { label: string; value: string }[];
  id?: string;
  className?: string;
};
