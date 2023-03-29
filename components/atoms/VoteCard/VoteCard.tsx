import Image from 'next/image';

import { VoteCardProps } from './VoteCard.types';

const DEFAULT_BG = '/assets/card_bg.png';

export const VoteCard: React.FC<VoteCardProps> = ({
  value,
  cardBackgroundImg,
  showVoteValue,
  name,
  className,
  ...rest
}) => {
  const cardBg = cardBackgroundImg || DEFAULT_BG;
  return (
    <>
      <div className={`h-20 w-14 ${className}`} {...rest}>
        {showVoteValue ? (
          <div className="flex h-20 w-14 items-center justify-center rounded-lg bg-bgMedium text-lg font-bold text-txtMedium">
            {value}
          </div>
        ) : (
          <div className="relative flex h-20 w-14 overflow-hidden rounded-lg bg-bgDarker">
            <Image src={cardBg} alt="vote" fill />
          </div>
        )}
      </div>
      {name && (
        <div className="absolute top-full mt-1 w-[90px] -translate-x-[17px] overflow-hidden truncate text-ellipsis text-center text-sm text-txtLight">
          {name}
        </div>
      )}
    </>
  );
};
