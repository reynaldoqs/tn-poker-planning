import create from "zustand";
import { combine, devtools } from "zustand/middleware";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";

import { AUTH_PROVIDERS, LOCAL_USER_KEY } from "~/constants";
import {
  BoardConfig,
  BoardStatus,
  LocalBoardStatus,
  Player,
  RoomConfig,
} from "~/types";
import { generateLocalUser } from "~/services/browserAuth";
import * as localStorageService from "~/services/storage";
import { RoomSocketManager } from "~/listeners/socketManager.client";

type RoomStates = {
  roomConfig: RoomConfig | null;
  boardConfig: BoardConfig | null;
  boardStatus: BoardStatus | null;
  localBoardStatus: LocalBoardStatus | null;
  players: Player[];
  connected: boolean;
  joined: boolean;
};

type RoomMutations = {
  setConnected: (connected: boolean) => void;
  setJoined: (connected: boolean) => void;
  setRoomConfig: (roomConfig: RoomConfig) => void;
  setBoardConfig: (boardConfig: BoardConfig) => void;
};

const initialStates: RoomStates = {
  roomConfig: null,
  boardConfig: null,
  boardStatus: null,
  localBoardStatus: null,
  players: [],
  connected: false,
  joined: false,
};

const mutations = (setState: any, getState: any): any => {
  console.log("estamos empezando el store");
  const roomSocketManager = RoomSocketManager.Instance;
  roomSocketManager.initConnection().then(() => {
    roomSocketManager.subscribeOnConnect();
  });
  return {
    actions: {
      setConnected: (connected: boolean) =>
        setState((state: any) => ({ ...state, connected })),
    },
  };
};

// const useRoomStore = create<RoomState>()(
//   devtools((set, get) => ({
//     roomConfig: null,
//     boardConfig: null,
//     boardStatus: null,
//     localBoardStatus: null,
//     players: [],
//     connected: false,
//     joined: false,
//     setConnected: (connected: boolean) =>
//       set((state) => ({ ...state, connected })),
//     setJoined: (joined: boolean) => set((state) => ({ ...state, joined })),
//     setRoomConfig: (roomConfig: RoomConfig) =>
//       set((state) => ({ ...state, roomConfig })),
//     setBoardConfig: () => {},
//   }))
// );

export default create(combine(initialStates, mutations));
