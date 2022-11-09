import { createElement } from "react";

import { TypographyProps, typographyVariants } from "./Typography.types";

//TODO: Remove this implementation
/**
 * @deprecated Typography component will be removed
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  as,
  className,
  children,
  ...rest
}) => {
  const typographyStyles = typographyVariants[variant];
  return createElement(
    as || typographyStyles.tag,
    { className: `${typographyStyles.tailwindClasses} ${className}`, ...rest },
    [children]
  );
};
