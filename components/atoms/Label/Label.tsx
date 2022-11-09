import * as LabelPrimitive from "@radix-ui/react-label";

export const Label: React.FC<LabelPrimitive.LabelProps> = ({
  className,
  ...rest
}) => (
  <LabelPrimitive.Root
    className={`text-md font-semibold text-txtMedium ${className}`}
    {...rest}
  />
);
