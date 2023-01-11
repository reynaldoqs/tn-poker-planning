import { StateCreator } from "zustand";
import print from "consola";

import { RoomSocketManager } from "~/listeners/socketManager.client";
import { RoomSlice, UserSlice } from "./stores.types";
import { BoardConfig, BoardStatus, Player, RoomConfig } from "~/types";
import { BOARD_STATUS, COUNTDOWN_IN_SECONDS } from "~/constants";

// TODO: find a way to don't init when the route is home
const createRoomSlice: StateCreator<
  RoomSlice & UserSlice,
  [["zustand/devtools", never]],
  [],
  RoomSlice
> = (set, get): RoomSlice => {
  const roomSocketManager = RoomSocketManager.Instance;
  roomSocketManager.initConnection().then(() => {
    roomSocketManager.subscribePlayerJoined((player) => {
      print.info(`[socket] ${player.name} has been joined to this board`);
    });

    roomSocketManager.subscribePlayerLeft((player) => {
      print.info(`[socket] ${player.name} has been left from this board`);
    });

    roomSocketManager.subscribePlayersUpdated((players) =>
      set((state) => ({ ...state, players }))
    );

    roomSocketManager.subscribePlayerDisconnected((player) => {
      print.info(
        `[socket] ${player.name} has been disconnected from this room`
      );
    });

    roomSocketManager.subscribePlayerReconnected((player) => {
      print.info(`[socket] ${player.name} has been reconnected`);
    });

    roomSocketManager.subscribeConfigUpdated((roomConfig) =>
      set((state) => ({ ...state, roomConfig }))
    );

    roomSocketManager.subscribeBoardConfigUpdated((boardConfig) =>
      set((state) => ({ ...state, boardConfig }))
    );

    roomSocketManager.subscribeBoardStatusUpdated((boardStatus) => {
      const prevBoardState = get().localBoardStatus;
      if (prevBoardState === "VOTING" && boardStatus === "SHOWING_RESULTS") {
        set((state) => ({ ...state, localBoardStatus: "COUNTING_DOWN" }));
        setTimeout(() => {
          set((state) => ({ ...state, localBoardStatus: boardStatus }));
        }, COUNTDOWN_IN_SECONDS * 1000);
      } else if (prevBoardState !== boardStatus) {
        set((state) => ({ ...state, localBoardStatus: boardStatus }));
      }
      set((state) => ({ ...state, boardStatus }));
    });

    // system subscriptions
    roomSocketManager.subscribeSysConnect(() =>
      set((state) => ({ ...state, connected: true }))
    );

    roomSocketManager.subscribeSysDisconnect(() => {
      set((state) => ({ ...state, connected: false }));
    });

    roomSocketManager.subscribeSysSuccess((msg) => {
      print.success(`[system socket]: ${msg}`);
    });

    roomSocketManager.subscribeSysError((error) => {
      print.error(`[system socket]: ${error}`);
    });

    roomSocketManager.subscribeSysInfo((msg) => {
      print.info(`[system socket]: ${msg}`);
    });
  });
  return {
    roomConfig: null,
    boardConfig: null,
    boardStatus: null,
    localBoardStatus: null,
    players: [],
    currentPlayer: null,
    connected: false,
    joined: false,
    checkoutPlayer(player: Player) {
      set((state) => ({ ...state, currentPlayer: player }));
    },
    updatePlayer(data: Partial<Player>) {},
    join(player) {
      roomSocketManager.join(player);
    },
    loadInitialRoom(room) {
      set((state) => ({
        ...state,
        roomConfig: room.roomConfig,
        boardConfig: room.boardConfig,
        boardStatus: room.boardStatus,
        localBoardStatus: room.boardStatus,
      }));
    },
    nextGameState() {
      const currentStatusIndex = BOARD_STATUS.findIndex(
        (boardStatus) => boardStatus === get().boardStatus
      );
      if (currentStatusIndex === -1) return;
      const nextStatusIndex = (currentStatusIndex + 1) % BOARD_STATUS.length;
      const nextStatus = BOARD_STATUS[nextStatusIndex];
      roomSocketManager.updateBoardStatus(nextStatus, get().currentPlayer!); //TODO: REMOVE THIS AND USE ROOM SOCKET PLAYER IN BE
    },
    // setConnected: (connected: boolean) =>
    //   set((state: any) => ({ ...state, connected })),
  };
};

export default createRoomSlice;
