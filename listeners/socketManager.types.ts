import { BoardConfig, BoardStatus, Player, RoomConfig } from "~/types";

export type ServerToClientEvents = {
  room_config_updated: (roomConfig: RoomConfig) => void;
  board_config_updated: () => void;
  board_status_updated: () => void;
  players_updated: (players: Player[]) => void;
  player_joined: (player: Player, cb?: () => void) => void;
  player_leaved: () => void;
  player_disconnected: (player: Player, reason: string) => void;
  player_reconnected: (player: Player) => void;
  // system messages
  success_connection: () => void;
  success: () => void;
  system_error: (error: unknown) => void;
  user_error: () => void;
  info: () => void;
  disconnect: () => void;
};

export type ClientToServerEvents = {
  join_room: (roomId: string, player: Player, cb?: () => void) => void;
  leave_room: (player: Player) => void;
  update_room_config: (roomConfig: RoomConfig, player: Player) => void;
  update_board_config: (boardConfig: BoardConfig, player: Player) => void;
  update_board_status: (boardStatus: BoardStatus, player: Player) => void;
  update_player: (player: Player) => void;
};

export type InterServerEvents = {
  ping: () => void;
  disconnect: (reason: string) => void;
};

export type SocketData = {
  player: Player;
  activeRoom: string;
};
