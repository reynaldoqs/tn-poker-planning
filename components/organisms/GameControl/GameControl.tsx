import { GameStateContent } from '~/components/molecules';
import { useBoundStore } from '~/stores';

export const GameControl: React.FC = () => {
  const roomConfig = useBoundStore((state) => state.roomConfig);
  const currentPlayer = useBoundStore((state) => state.currentPlayer);
  const localBoardStatus = useBoundStore((state) => state.localBoardStatus);
  const players = useBoundStore((state) => state.players);
  const onNextGameState = useBoundStore((state) => state.nextGameState);

  const canControl =
    roomConfig?.whoCanManage === 'ANYONE'
      ? true
      : currentPlayer?.playerId === roomConfig?.owner?.providerId;

  const validVotes = players
    .map((player) => player.voteValue)
    .filter(Boolean) as string[];

  return (
    <div className="h-full w-full p-5 pt-7">
      <div className="flex h-full w-full items-center justify-center">
        <GameStateContent
          state={localBoardStatus}
          votes={validVotes}
          hasControls={canControl}
          onNextGameState={onNextGameState}
        />
      </div>
    </div>
  );
};

//https://framerbook.com/animation/example-animations/10-animation-sequence/ to animate each element in sequence
