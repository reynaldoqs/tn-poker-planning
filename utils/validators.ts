import { Player, User } from "~/types";

export const isPlayer = (input: User | Player): input is Player => {
  return "type" in input && "playerId" in input; // for now it is enough to know if input is a player
};
