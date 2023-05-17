import * as AvatarPrimitive from '@radix-ui/react-avatar';

import type { AvatarProps } from './Avatar.types';

const getAltInitials = (alt: string) => {
  if (!alt) return 'NA';
  return alt
    .split(' ')
    .map((n) => n[0].toUpperCase())
    .join('');
};

export const Avatar: React.FC<AvatarProps> = ({
  className,
  alt,
  src,
  ...rest
}) => (
  <AvatarPrimitive.Root
    className={`flex h-11 w-11 select-none items-center justify-center overflow-hidden rounded-2xl bg-bgDarker ${className}`}
    {...rest}
  >
    <AvatarPrimitive.Image
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
    />
    <AvatarPrimitive.Fallback
      delayMs={1800}
      className="text-sm font-semibold text-txtMedium"
    >
      {getAltInitials(alt)}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
);
