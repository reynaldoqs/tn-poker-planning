import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type FeatureCardProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: IconDefinition;
  title: string;
  description: string;
  iconClassName?: string;
};
