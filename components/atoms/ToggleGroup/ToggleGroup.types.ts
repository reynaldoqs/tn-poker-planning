import React from 'react';

export type ToggleGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
