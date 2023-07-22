import print from 'consola';
import type { StateCreator } from 'zustand';

import { BOARD_STATUS, COUNTDOWN_IN_SECONDS } from '~/constants';
import { RoomSocketManager } from '~/socket/socketManager.client';
import type { Player } from '~/types';

import { roomSliceMock } from './roomSlice.mock';
import type { RoomSlice } from './roomSlice.types';
import type { UserSlice } from './userSlice.types';

const createRoomSlice: StateCreator<
  RoomSlice & UserSlice,
  [['zustand/devtools', never]],
  [],
  RoomSlice
> = (set, get): RoomSlice => {
  const roomSocketManager = RoomSocketManager.Instance;

  return {
    ...roomSliceMock.initial,
    loadInitialRoom(room) {
      set((state) => ({
        ...state,
        roomConfig: room.roomConfig,
        boardConfig: room.boardConfig,
        boardStatus: room.boardStatus,
        localBoardStatus: room.boardStatus,
      }));
    },
    subscribeRoomEvents() {
      roomSocketManager.initConnection().then(() => {
        subscribeAllRoomEvents(roomSocketManager, set, get);
      });
    },
    checkoutPlayer(player) {
      set((state) => ({ ...state, currentPlayer: player }));
    },
    updatePlayer(player) {
      roomSocketManager.updatePlayer(player);
    },
    updateVote(vote) {
      set((state) => ({
        ...state,
        currentPlayer: { ...state.currentPlayer, voteValue: vote } as Player,
      }));
      roomSocketManager.updatePlayer({ voteValue: vote });
    },
    join(player) {
      roomSocketManager.join(player);
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
  };
};

export default createRoomSlice;

// @todo: refactor this then move it to .helper
const subscribeAllRoomEvents = (
  roomManager: RoomSocketManager,
  set: (state: (state: RoomSlice) => RoomSlice) => void,
  get: () => RoomSlice
) => {
  roomManager.subscribePlayerJoined((player) => {
    print.info(`[socket] ${player.name} has been joined to this board`);
  });

  roomManager.subscribePlayerLeft((player) => {
    print.info(`[socket] ${player.name} has been left from this board`);
  });

  roomManager.subscribePlayersUpdated((players) =>
    set((state) => ({ ...state, players }))
  );

  roomManager.subscribePlayerDisconnected((player) => {
    print.info(`[socket] ${player.name} has been disconnected from this room`);
  });

  roomManager.subscribePlayerReconnected((player) => {
    print.info(`[socket] ${player.name} has been reconnected`);
  });

  roomManager.subscribeConfigUpdated((roomConfig) =>
    set((state) => ({ ...state, roomConfig }))
  );

  roomManager.subscribeBoardConfigUpdated((boardConfig) =>
    set((state) => ({ ...state, boardConfig }))
  );

  roomManager.subscribeBoardStatusUpdated((boardStatus) => {
    const prevBoardState = get().localBoardStatus;
    if (prevBoardState === 'VOTING' && boardStatus === 'SHOWING_RESULTS') {
      set((state) => ({ ...state, localBoardStatus: 'COUNTING_DOWN' }));
      setTimeout(() => {
        set((state) => ({ ...state, localBoardStatus: boardStatus }));
      }, COUNTDOWN_IN_SECONDS * 1000);
    } else if (prevBoardState !== boardStatus) {
      set((state) => ({ ...state, localBoardStatus: boardStatus }));
    }
    set((state) => ({ ...state, boardStatus }));
  });

  // system subscriptions
  roomManager.subscribeSysConnect(() => {
    set((state) => ({ ...state, connected: true }));
  });

  roomManager.subscribeSysDisconnect(() => {
    set((state) => ({ ...state, connected: false }));
  });

  roomManager.subscribeSysSuccess((msg) => {
    print.success(`[system socket]: ${msg}`);
  });

  roomManager.subscribeSysError((error) => {
    print.error(`[system socket]: ${error}`);
  });

  roomManager.subscribeSysInfo((msg) => {
    print.info(`[system socket]: ${msg}`);
  });
};
