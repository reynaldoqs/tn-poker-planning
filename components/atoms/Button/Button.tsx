import { clsx } from 'clsx';

import type { ButtonProps } from './Button.types';

// const sizeStyleMap: Record<Exclude<ButtonProps['size'], undefined>, string> = {
//   lg: 'rounded-xl py-3 px-8 text-lg font-bold',
//   md: 'rounded-lg py-2 px-5 text-md font-bold',
//   sm: 'rounded-lg py-1 px-3 text-sm font-semibold',
// };

/**
 * This function returns a button component
 * @param title - The title of the button
 * @param size - The size of the button (lg, md, sm)
 * @param variant - The variant of the button (primary, secondary)
 * @param outlined - Whether the button is outlined or not
 * @param className - The className of the button
 * @param onClick - The onClick handler of the button
 * @returns A button component
 * @example
 * <Button title="Next round" outlined />
 * <Button title="Next round" size="lg" />
 * <Button title="Next round" variant="secondary" />
 * <Button title="Next round" className="bg-red-500" />
 * <Button title="Next round" onClick={() => console.log("clicked")} />
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  size = 'md',
  variant = 'primary',
  outlined,
  className,
  disabled,
  ...rest
}) => {
  const sizeClasses = clsx({
    'rounded-xl py-3 px-8 text-lg font-bold': size === 'lg',
    'rounded-lg py-2 px-5 text-md font-bold': size === 'md',
    'rounded-lg py-1 px-3 text-sm font-semibold': size === 'sm',
  });

  const variantClasses = clsx({
    'bg-primary': variant === 'primary' && !outlined,
    'bg-secondary': variant === 'secondary' && !outlined,
  });

  const outlinedClasses = clsx({
    border: outlined,
    'border-2': outlined && size === 'lg',
  });

  const disabledClasses = clsx({
    'opacity-20': disabled,
    'active:opacity-20': !disabled,
  });

  return (
    <button
      className={`${sizeClasses} ${variantClasses} ${outlinedClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {title}
    </button>
  );
};
