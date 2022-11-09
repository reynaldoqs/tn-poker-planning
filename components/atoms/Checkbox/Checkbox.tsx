import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { CheckboxProps } from "./Checkbox.types";

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  id,
  ...rest
}) => (
  <div className={`flex items-center ${className}`}>
    <CheckboxPrimitive.Root
      id={id}
      className="mr-4 inline-block h-5 w-5 rounded bg-txtLight radix-state-checked:bg-primary"
      {...rest}
    >
      <CheckboxPrimitive.Indicator className="flex h-full items-center justify-center">
        <FontAwesomeIcon icon={faCheck} className="text-txtMedium" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <LabelPrimitive.Root
        htmlFor={id}
        className="cursor-pointer text-sm text-txtDark"
      >
        {label}
      </LabelPrimitive.Root>
    )}
  </div>
);
