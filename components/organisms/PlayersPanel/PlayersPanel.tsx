import { Button } from '~/components/atoms';
import { PlayerItem } from '~/components/molecules';
import { useBoundStore } from '~/stores';

export const PlayersPanel: React.FC = () => {
  const players = useBoundStore((state) => state.players);
  return (
    <aside className="grid h-full grid-rows-[50px_1fr_80px] bg-bgMedium p-2 md:px-4 md:py-5">
      <h3 className="text-2xl font-semibold text-yellow-50 md:pl-1">
        <span className="hidden md:block">Players</span>
        <span className="block text-center md:hidden">👥</span>
      </h3>
      <div className="flex max-h-[calc(100vh_-_280px)] flex-col gap-3 overflow-y-auto">
        {players.map((player) => (
          <PlayerItem key={player.playerId} player={player} />
        ))}
      </div>
      <div className="mt-auto flex h-full items-center justify-center">
        <Button
          title="Invite Player"
          variant="primary"
          className="hidden md:flex"
        />
        <Button
          title="+"
          variant="primary"
          className="mt-auto flex text-2xl md:hidden"
        />
      </div>
    </aside>
  );
};
