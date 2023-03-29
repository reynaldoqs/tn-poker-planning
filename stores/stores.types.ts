import { AUTH_PROVIDERS } from '~/constants';
import {
  BoardConfig,
  BoardStatus,
  LocalBoardStatus,
  Player,
  Room,
  RoomConfig,
  User,
} from '~/types';

export type UserSlice = {
  user: User | null;
  signIn: (provider: keyof typeof AUTH_PROVIDERS, name?: string) => void;
  signOut: () => void;
  setUser: (user: User) => void;
};

export type RoomSlice = {
  // try to use satisfies
  roomConfig: RoomConfig | null;
  boardConfig: BoardConfig | null;
  boardStatus: BoardStatus | null;
  localBoardStatus: LocalBoardStatus | null;
  players: Player[];
  currentPlayer: Player | null;
  // currentPlayerSlotTarget: CurrentPlayerCardSlotPosition;
  connected: boolean;
  joined: boolean;
  checkoutPlayer: (player: Player) => void; // it could be directly w/o player parameter ???
  updatePlayer: (data: Partial<Player>) => void;
  updateVote: (vote: string) => void;
  join: (player: Player) => void; // it could be directly w/o player parameter
  loadInitialRoom: (room: Room) => void;
  nextGameState: () => void;
  // updateCurrentPlayerSlotTarget: (pos: CurrentPlayerCardSlotPosition) => void;
  //   setConnected: (connected: boolean) => void;
  //   setJoined: (connected: boolean) => void;
  //   setRoomConfig: (roomConfig: RoomConfig) => void;
  //   setBoardConfig: (boardConfig: BoardConfig) => void;
};

// type RoomStates = {
//     roomConfig: RoomConfig | null;
//     boardConfig: BoardConfig | null;
//     boardStatus: BoardStatus | null;
//     localBoardStatus: LocalBoardStatus | null;
//     players: Player[];
//     connected: boolean;
//     joined: boolean;
//   };

//   type RoomMutations = {
//     setConnected: (connected: boolean) => void;
//     setJoined: (connected: boolean) => void;
//     setRoomConfig: (roomConfig: RoomConfig) => void;
//     setBoardConfig: (boardConfig: BoardConfig) => void;
//   };
