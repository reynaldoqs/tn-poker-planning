import { MenuItemProps } from './MenuItem.types';

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  adornment,
  ...rest
}) => (
  <div className={`flex items-center py-2 ${className}`} {...rest}>
    <div className="flex w-16 items-center justify-center">{adornment}</div>
    <div className="flex-auto text-base font-semibold">{children}</div>
  </div>
);
