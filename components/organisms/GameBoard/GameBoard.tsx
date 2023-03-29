import { useRef } from 'react';

import { useBoundStore } from '~/stores';
import { GameTable } from '~/components/molecules/GameTable';
import { getOffset } from '~/utils';
import { Deck } from '../Deck';
import { GameControl } from '../GameControl';
import { GameHeader } from '../GameHeader';

export const GameBoard: React.FC = () => {
  const boardConfig = useBoundStore((state) => state.boardConfig);
  const currentPlayer = useBoundStore((state) => state.currentPlayer);
  const localBoardStatus = useBoundStore((state) => state.localBoardStatus);
  const playersVote = useBoundStore((state) => state.players);
  const updateVote = useBoundStore((state) => state.updateVote);

  const playersVoteWithoutCurrentPlayer = playersVote.filter(
    (player) => player.playerId !== currentPlayer?.playerId
  );

  const currentUserSlot = useRef<HTMLDivElement>(null);

  const targetSlotOffset = getOffset(currentUserSlot.current);

  return (
    <div className="flex h-full w-full flex-col">
      <GameHeader />
      <main className="flex flex-1 items-center justify-center">
        <GameTable
          votes={playersVote}
          currentPlayer={currentPlayer}
          localBoardStatus={localBoardStatus!}
          currentPlayerSlotRef={currentUserSlot}
        >
          <GameControl />
        </GameTable>
      </main>
      <footer>
        <Deck
          boardConfig={boardConfig}
          targetSlotOffset={targetSlotOffset}
          currentPlayer={currentPlayer}
          onSelectVote={updateVote}
        />
      </footer>
    </div>
  );
};
