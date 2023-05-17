import {
  BoardConfig,
  BoardStatus,
  LocalBoardStatus,
  Player,
  Room,
  RoomConfig,
} from '~/types';

export type RoomSlice = {
  roomConfig: RoomConfig;
  boardConfig: BoardConfig;
  boardStatus: BoardStatus;
  localBoardStatus: LocalBoardStatus;
  players: Player[];
  currentPlayer: Player;
  connected: boolean;
  joined: boolean;
  loadInitialRoom: (room: Room) => void;
  subscribeRoomEvents: () => void;
  checkoutPlayer: (player: Player) => void; // it could be directly w/o player parameter ???
  updatePlayer: (data: Partial<Player>) => void;
  updateVote: (vote: string) => void;
  join: (player: Player) => void; // it could be directly w/o player parameter
  nextGameState: () => void;
};
