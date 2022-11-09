import * as SelectPrimitive from "@radix-ui/react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { SelectProps } from "./Select.types";

export const Select: React.FC<SelectProps> = ({
  options = [],
  className,
  id,
  ...rest
}) => {
  return (
    <div className={className} id={id}>
      <SelectPrimitive.Root {...rest}>
        <SelectPrimitive.Trigger className="flex h-10 w-full items-center rounded-lg bg-bgDark px-3 text-sm text-txtMedium focus:outline-none">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-auto text-sm text-txtLight" />
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="z-30 overflow-hidden rounded-xl bg-bgDark shadow-lg">
            {/* <SelectPrimitive.ScrollUpButton /> */}
            <SelectPrimitive.Viewport>
              {options.map(({ value, label }) => (
                <SelectPrimitive.Item
                  key={value}
                  value={value}
                  className="flex cursor-pointer select-none justify-between py-3 px-3 text-sm hover:bg-primary hover:outline-none"
                >
                  <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}

              {/* <SelectPrimitive.Separator className="bg-gray-700 my-4 h-[1px]" />
            <SelectPrimitive.Group>
              <SelectPrimitive.Label />
              <SelectPrimitive.Item value={"dos"}>
                <SelectPrimitive.ItemText>dos</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator />
              </SelectPrimitive.Item>
            </SelectPrimitive.Group> */}
            </SelectPrimitive.Viewport>
            {/* <SelectPrimitive.ScrollDownButton /> */}
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
};
