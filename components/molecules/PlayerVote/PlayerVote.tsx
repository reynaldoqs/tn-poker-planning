import { motion } from 'framer-motion';
import { useRef } from 'react';

import { VoteCard } from '~/components/atoms';
import { getOffset } from '~/utils';

import type { PlayerVoteProps } from './PlayerVote.types';

export const PlayerVote: React.FC<PlayerVoteProps> = ({
  currentPlayer,
  isSelected,
  cardVoteValue,
  targetSlotPosition,
  onSelectVote,
}) => {
  const currentBoxRef = useRef<HTMLLIElement>(null);
  const { x: boxX, y: boxY } = getOffset(currentBoxRef.current);

  const variants = {
    selected: {
      x: targetSlotPosition.x - boxX,
      y: targetSlotPosition.y - boxY,
      // rotateY: 180,
      // scale: 1.1,
      // transition: { duration: 0.35 },
      // zIndex: 10,
      // boxShadow:
      //   "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    },
    notSelected: {
      x: 0,
      y: 0,
      // rotateY: 0,
      // scale: 1 - Math.abs(i * 0.15),

      // opacity: 1 - Math.abs(i * 0.15),
      // zIndex: 10 - Math.abs(i),
      // boxShadow:
      //   "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      // transition: { duration: 0.35 },
    },
  };

  return (
    <li
      ref={currentBoxRef}
      className="h-20 w-14 cursor-pointer select-none rounded-lg border border-bgDark/20"
    >
      <motion.div
        className="flex h-fit w-fit"
        whileHover={{ scale: 1.1 }}
        // transition={{ type: "spring", stiffness: 200, damping: 200 }}
        animate={isSelected ? 'selected' : 'notSelected'}
        variants={variants}
        onClick={() => onSelectVote?.(cardVoteValue)}
      >
        <VoteCard
          showVoteValue={!isSelected}
          value={cardVoteValue}
          cardBackgroundImg={currentPlayer.cardBackground}
          name={isSelected ? currentPlayer.name : undefined}
        />
      </motion.div>
    </li>
  );
};
