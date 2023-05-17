import { OmitFuncType } from '~/utils';
import { RoomSlice } from './roomSlice.types';

const initial: OmitFuncType<RoomSlice> = {
  roomConfig: {
    title: '',
    whoCanManage: 'OWNER',
    authentication: {
      required: false,
    },
  },
  boardConfig: {
    voteType: 'NUMBER',
    voteValues: [],
  },
  boardStatus: 'IDLE',
  localBoardStatus: 'IDLE',
  players: [],
  currentPlayer: {
    status: 'CONNECTED',
    type: 'PLAYER',
    name: '',
    provider: 'facebook',
    playerId: '',
  },
  connected: false,
  joined: false,
};

export const roomSliceMock = {
  initial,
};
