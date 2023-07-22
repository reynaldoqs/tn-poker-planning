import type {
  BoardConfig,
  BoardStatus,
  Player,
  Room,
  RoomConfig,
} from '~/types';

export type RoomDatabase = {
  createRoom: (room: Room) => Promise<Room>;
  getRoom: (roomId: string) => Promise<Room>;
  updatePlayer: (roomId: string, player: Player) => Promise<Room>;
  updatePlayerStatus: (
    roomId: string,
    playerId: string,
    status: Room['players'][number]['status']
  ) => Promise<Room>;
  pushPlayer: (roomId: string, player: Player) => Promise<Room>;
  removePlayer: (roomId: string, player: Player) => Promise<Room>;
  resetPlayers: (roomId: string) => Promise<Room>;
  updateRoomConfig: (
    roomId: string,
    config: Partial<RoomConfig>,
    playerId: string
  ) => Promise<Room>;
  updateBoardStatus: (
    roomId: string,
    status: BoardStatus,
    playerId: string
  ) => Promise<Room | undefined>;
  updateBoardConfig: (
    roomId: string,
    config: Partial<BoardConfig>,
    playerId: string
  ) => Promise<Room | undefined>;
};
