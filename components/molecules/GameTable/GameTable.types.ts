import { RefObject } from 'react';

import { LocalBoardStatus, Player } from '~/types';

export type GameTableProps = React.HTMLAttributes<HTMLDivElement> & {
  votes: Player[];
  localBoardStatus: LocalBoardStatus;
  currentPlayer: Player;
  currentPlayerSlotRef: RefObject<HTMLDivElement>; // Ref<HTMLDivElement>
};

export type TableSections = {
  left: Player[];
  right: Player[];
  top: Player[];
  bottom: Player[];
};
