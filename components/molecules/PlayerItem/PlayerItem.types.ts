import { Player } from "~/types";

export type PlayerItemProps = React.HTMLAttributes<HTMLDivElement> & {
  player: Player;
};
