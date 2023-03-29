import { Player } from '~/types';

export type PlayerVoteProps = {
  currentPlayer: Player;
  isSelected: boolean;
  cardVoteValue: string;
  targetSlotPosition: { x: number; y: number };
  onSelectVote: (voteValue: Player['voteValue']) => void;
};
