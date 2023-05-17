import type { LocalBoardStatus } from '~/types';

export type GameStateContentProps = {
  state: LocalBoardStatus;
  votes: string[];
  hasControls?: boolean;
  onNextGameState: () => void;
};
