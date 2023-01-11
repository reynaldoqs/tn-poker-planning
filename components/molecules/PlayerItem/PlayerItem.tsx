import { Avatar } from "~/components/atoms";
import { PlayerItemProps } from "./PlayerItem.types";

export const PlayerItem: React.FC<PlayerItemProps> = ({ player, ...rest }) => {
  const isObserver = player.type === "OBSERVER";
  const isDisconnected = player.status === "DISCONNECTED";

  return (
    <div
      className={`flex items-center justify-center gap-4 grayscale${
        isDisconnected ? "" : "-0"
      }`}
      {...rest}
    >
      <Avatar src={player.avatar} alt={player.name} />
      <div className="hidden w-fit flex-1 overflow-hidden text-ellipsis whitespace-nowrap md:flex">
        <h4 className="text-base font-bold">{player.name}</h4>
        {isObserver && (
          <p className="text-sm leading-4 text-green-200">Observer</p>
        )}
      </div>
    </div>
  );
};
