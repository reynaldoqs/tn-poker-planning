import type { BoardConfig, Player } from '~/types';

export type DeckProps = React.HTMLAttributes<HTMLDivElement> & {
  boardConfig: BoardConfig;
  currentPlayer: Player;
  targetSlotOffset: {
    x: number;
    y: number;
  };
  onSelectVote?: (voteValue: Player['voteValue']) => void;
};
