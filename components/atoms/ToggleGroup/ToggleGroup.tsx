import * as PrimitiveToggleGroup from '@radix-ui/react-toggle-group';

import type { ToggleGroupProps } from './ToggleGroup.types';

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options = [],
  value,
  defaultValue,
  onValueChange,
  ...rest
}) => (
  <div {...rest}>
    <PrimitiveToggleGroup.Root
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className="flex h-10 w-fit items-center justify-center gap-1 rounded-lg bg-bgDark px-1 py-1"
    >
      {options.map(({ value, label }) => (
        <PrimitiveToggleGroup.Item
          key={value}
          value={value}
          className="flex h-full items-center rounded-md px-2 text-sm text-txtDark radix-state-off:active:opacity-20 radix-state-on:bg-primary radix-state-on:text-txtLight"
        >
          {label}
        </PrimitiveToggleGroup.Item>
      ))}
    </PrimitiveToggleGroup.Root>
  </div>
);
