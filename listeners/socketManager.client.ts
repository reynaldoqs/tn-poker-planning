import { io, Socket } from 'socket.io-client';
import {
  BoardConfig,
  BoardStatus,
  DocumentRoom,
  Player,
  PokerPlanningError,
  Room,
  RoomConfig,
} from '~/types';
import print from 'consola';

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './socketManager.types';

export class RoomSocketManager {
  private static _instance: RoomSocketManager;
  private _socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  private _roomId?: string;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async initConnection(cb?: () => void) {
    if (this._socket) return;
    await fetch('http://localhost:3000/api/socket');
    this._socket = io();
    cb?.();
    print.info('connection fetch: emitted');
  }
  public set roomId(roomId: string) {
    this._roomId = roomId;
  }

  public join(player: Player) {
    //TODO: probably here is needed a callback to set state
    if (!this._roomId) {
      throw new PokerPlanningError('roomId is missing', 'user');
    }
    this._socket?.emit('join_room', this._roomId, player);
    print.info('join_room: emitted');
  }

  public disconnect() {
    this._socket?.disconnect();
    print.info('disconnect: emitted');
  }

  public leave(player: Player) {
    this._socket?.emit('leave_room', player);
    print.info('leave: emitted');
  }

  public updateConfig(roomConfig: RoomConfig, player: Player) {
    this._socket?.emit('update_room_config', roomConfig, player);
    print.info('updateConfig: emitted');
  }

  public updateBoardStatus(boardStatus: BoardStatus, player: Player) {
    this._socket?.emit('update_board_status', boardStatus, player);
    print.info('updateBoardStatus: emitted');
  }

  public updateBoardConfig(boardConfig: BoardConfig, player: Player) {
    this._socket?.emit('update_board_config', boardConfig, player);
    print.info('updateBoardConfig: emitted');
  }

  public updatePlayer(player: Partial<Player>) {
    this._socket?.emit('update_player', player);
    print.info('updatePlayer: emitted');
  }

  // subscriptions
  public subscribePlayerJoined(cb: (player: Player) => void) {
    this._socket?.on('player_joined', cb);
  }

  public subscribeConfigUpdated(cb: (roomConfig: RoomConfig) => void) {
    this._socket?.on('room_config_updated', cb);
  }

  public subscribeBoardConfigUpdated(cb: (boardConfig: BoardConfig) => void) {
    this._socket?.on('board_config_updated', cb);
  }

  public subscribeBoardStatusUpdated(cb: (boardStatus: BoardStatus) => void) {
    this._socket?.on('board_status_updated', cb);
  }

  public subscribePlayersUpdated(cb: (players: Player[]) => void) {
    this._socket?.on('players_updated', cb);
  }

  public subscribePlayerLeft(cb: (player: Player) => void) {
    this._socket?.on('player_left', cb);
  }

  public subscribePlayerDisconnected(
    cb: (player: Player, reason: string) => void
  ) {
    this._socket?.on('player_disconnected', cb);
  }

  public subscribePlayerReconnected(cb: (player: Player) => void) {
    this._socket?.on('player_reconnected', cb);
  }

  // system subscriptions
  public subscribeSysConnect(cb: () => void) {
    this._socket?.on('connect', () => {
      console.log('ESTAMOS CONECTADOS CARAJOOOOOOOOOOOOOOOOOOOOOOOO');
      cb();
    });
  }

  public subscribeSysDisconnect(cb: (reason: string) => void) {
    this._socket?.on('disconnect', cb);
  }

  public subscribeSysSuccess(cb: (msg: string) => void) {
    this._socket?.on('system_success', cb);
  }

  public subscribeSysError(cb: (error: unknown) => void) {
    this._socket?.on('system_error', cb);
  }

  public subscribeSysInfo(cb: (info: string) => void) {
    this._socket?.on('system_info', cb);
  }
}
