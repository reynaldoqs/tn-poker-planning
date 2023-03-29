import { Avatar } from '~/components/atoms';
import { VoteSlotProps } from './VoteSlot.types';
import { forwardRef } from 'react';

export const VoteSlot = forwardRef<HTMLDivElement, VoteSlotProps>(
  ({ imgSrc, name }, ref) => {
    return (
      <div
        className="flex h-20 w-14 items-center justify-center rounded-lg bg-bgMedium opacity-40 grayscale"
        ref={ref}
      >
        <Avatar className="rounded-full bg-bgDark" src={imgSrc} alt={name} />
      </div>
    );
  }
);

VoteSlot.displayName = 'VoteSlot';
