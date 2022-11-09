import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FeatureCardProps } from "./FeatureCard.types";

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  iconClassName,
  ...rest
}) => (
  <div
    className="w-[124px] rounded-2xl bg-bgMedium px-3 py-5 text-center"
    {...rest}
  >
    <FontAwesomeIcon icon={icon} size="2x" className={iconClassName} />
    <h4 className="mt-3 text-sm font-bold">{title}</h4>
    <p className="mt-1 text-xs text-txtDark">{description}</p>
  </div>
);
