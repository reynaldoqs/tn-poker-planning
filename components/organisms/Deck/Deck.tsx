import { PlayerVote } from '~/components/molecules';

import type { DeckProps } from './Deck.types';

export const Deck: React.FC<DeckProps> = ({
  boardConfig,
  currentPlayer,
  targetSlotOffset,

  onSelectVote,
}) => (
  <menu className="flex h-fit w-full flex-wrap justify-center gap-4 px-4 py-6">
    {boardConfig?.voteValues.map((vote) => (
      <PlayerVote
        targetSlotPosition={targetSlotOffset}
        key={vote}
        cardVoteValue={vote}
        onSelectVote={() => onSelectVote?.(vote)}
        isSelected={currentPlayer.voteValue === vote}
        currentPlayer={currentPlayer}
      />
    ))}
  </menu>
);
