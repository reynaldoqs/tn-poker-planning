import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { FeatureCardProps } from './FeatureCard.types';

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  iconClassName,
  ...rest
}) => (
  <div {...rest} className="flex max-w-[240px] gap-4">
    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-bgMedium">
      <FontAwesomeIcon icon={icon} size="2x" className={iconClassName} />
    </div>
    <div>
      <h4 className="text-md my-1 font-bold">{title}</h4>
      <p className=" text-xs text-txtDark">{description}</p>
    </div>
  </div>
);
