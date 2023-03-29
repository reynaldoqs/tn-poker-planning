import { BoardConfig, LocalBoardStatus, RoomConfig } from '~/types';

export type GameStateContentProps = {
  state: LocalBoardStatus;
  hasControls?: boolean;
  onNextGameState: () => void;
};
