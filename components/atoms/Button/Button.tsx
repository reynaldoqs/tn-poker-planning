import { ButtonProps } from './Button.types';

const sizeStyleMap: Record<Exclude<ButtonProps['size'], undefined>, string> = {
  lg: 'rounded-xl py-3 px-8 text-lg font-bold',
  md: 'rounded-lg py-2 px-5 text-md font-bold',
  sm: 'rounded-lg py-1 px-3 text-sm font-semibold',
};

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
  const anudiman = `${outlined ? '' : `bg-${variant}`} active:opacity-${
    disabled ? '20' : '40'
  } ${sizeStyleMap[size]} ${
    outlined ? `border${size === 'lg' ? '-2' : ''}` : ''
  } opacity-${disabled ? '20' : '1'}  ${className}`;

  return (
    <button className={anudiman} disabled={disabled} {...rest}>
      {title}
    </button>
  );
};
