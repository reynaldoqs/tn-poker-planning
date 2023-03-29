import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type InputProps = React.HTMLAttributes<HTMLInputElement> & {
  errorMessage?: string | null;
  actionTitle?: string;
  actionIcon?: IconDefinition;
  onActionClick?: () => void;
};
