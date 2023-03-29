import { VoteCard, VoteSlot } from '~/components/atoms';

import { GameTableProps, TableSections } from './GameTable.types';
import { orderPlayersToSections } from './GameTable.helper';

export const GameTable: React.FC<GameTableProps> = ({
  votes = [],
  localBoardStatus,
  currentPlayer,
  currentPlayerSlotRef,
  children,
  ...rest
}) => {
  const playersOrdered = orderPlayersToSections(votes);

  const renderSection = (section: keyof TableSections) => (
    <>
      {playersOrdered[section].map((player) => (
        <div key={player.playerId} className="relative">
          <VoteSlot
            ref={
              player.playerId === currentPlayer.playerId
                ? currentPlayerSlotRef
                : null
            }
            imgSrc={player.avatar}
            name={player.name}
          />
          {player.playerId !== currentPlayer.playerId && player.voteValue && (
            <VoteCard
              className="absolute top-0 left-0"
              value={player.voteValue}
              showVoteValue={false}
              cardBackgroundImg={player.cardBackground}
              name={player.name}
            />
          )}
        </div>
      ))}
    </>
  );

  return (
    <section {...rest}>
      <div className="game-table-container h-[600px] w-[700px]">
        <ul className="flex flex-col items-center justify-center gap-12 [grid-area:left]">
          {renderSection('left')}
        </ul>
        <ul className="flex flex-col items-center justify-center gap-3 [grid-area:right]">
          {renderSection('right')}
        </ul>
        <ul className="flex flex-row items-center justify-evenly [grid-area:top]">
          {renderSection('top')}
        </ul>
        <ul className="flex flex-row items-center justify-evenly [grid-area:bottom]">
          {renderSection('bottom')}
        </ul>
        <div className="flex items-center justify-center [grid-area:middle]">
          {children}
        </div>
      </div>
    </section>
  );
};
