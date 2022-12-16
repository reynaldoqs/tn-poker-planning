import { io, Socket } from "socket.io-client";
import { DocumentRoom, Player, Room, RoomConfig } from "~/types";
import print from "consola";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./socketManager.types";

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
    await fetch("/api/socket");
    this._socket = io();
    cb?.();
    print.success("socket connected");
  }
  public set roomId(roomId: string) {
    this._roomId = roomId;
  }

  public subscribeOnConnect() {
    if (this._socket && this._roomId)
      this._socket.on("connect", () => {
        console.log("SE CONECTO LA PUITA MASMDASMDASMD");
      });
  }

  public join(player: Player, successCb: () => void) {
    if (this._socket && this._roomId)
      this._socket.emit("join_room", this._roomId, player, successCb);
  }

  public disconnect() {
    if (this._socket && this._roomId) this._socket.disconnect();
  }

  public leave(player: Player) {
    if (this._socket && this._roomId) this._socket.emit("leave_room", player);
  }

  public updateConfig(roomConfig: RoomConfig, player: Player) {
    if (this._socket && this._roomId)
      this._socket.emit("update_room_config", roomConfig, player);
  }
  // subscriptions
  public subscribePlayerJoined(successCb: () => void) {
    if (this._socket && this._roomId)
      this._socket.on("player_joined", successCb);
  }
}
