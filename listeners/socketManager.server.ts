import { Server, Socket } from "socket.io";
import print from "consola";

import { extractParticipant, includesParticipant } from "~/utils";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./socketManager.types";
import { RoomDatabase } from "~/models/models.types";

export class RoomSocketManager {
  private io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
  private db: RoomDatabase;
  constructor(io: Server, db: RoomDatabase) {
    this.io = io;
    this.db = db;
  }

  public subscribeToClientRequests() {
    this.io.on("connection", (socket) => {
      this.io.on("disconnect", async (reason) => {
        try {
          const activeRoomId = socket.data.activeRoom;
          const socketPlayer = socket.data.player;

          if (!activeRoomId || !socketPlayer)
            throw "playerId or roomId not found";

          // when disconnecting after leave room it throw an error (sync error)
          const updatedRoom = await this.db.updatePlayerStatus(
            activeRoomId,
            socketPlayer.playerId,
            "DISCONNECTED"
          );
          if (!updatedRoom)
            throw `error updating player::[${socketPlayer.playerId}]:[${socketPlayer.name}] status to DISCONNECTED`;

          socket.broadcast
            .to(activeRoomId)
            .emit("player_disconnected", socketPlayer, reason);

          this.io.to(activeRoomId).emit("players_updated", updatedRoom.players);
          print.success("player_disconnected: completed");
        } catch (error) {
          print.error(error);
          return socket.emit("system_error", error);
        }
      });
      socket.on("join_room", async (roomId, player, cb) => {
        try {
          if (!player.playerId) throw "player id not found";
          let isReconnection = false;
          let room = await this.db.getRoom(roomId);
          if (!room) throw "room not found.";

          const hasOwner = room.roomConfig?.owner?.providerId;
          if (!hasOwner) {
            await this.db.updateRoomConfig(
              roomId,
              {
                owner: {
                  provider: player.provider,
                  providerId: player.playerId,
                },
              },
              player.playerId
            );
          }

          // if there is a participant with id, its a rejoin
          if (!includesParticipant(room, player)) {
            room = await this.db.pushPlayer(roomId, player);
            if (!room) throw "insert participant failed.";
          } else {
            // reconnection
            room = await this.db.updatePlayerStatus(
              roomId,
              player.playerId,
              "CONNECTED"
            );
            isReconnection = true;
            if (!room) throw "update participant status failed.";
          }

          const dbPlayer = extractParticipant(room, player.playerId);

          socket.join(roomId);
          socket.data.activeRoom = roomId;
          socket.data.player = player;

          socket.join(roomId);
          socket.data.activeRoom = roomId;
          socket.data.player = player;

          if (isReconnection) {
            socket.broadcast
              .to(socket.data.activeRoom)
              .emit("player_reconnected", dbPlayer);
          } else {
            socket.broadcast
              .to(socket.data.activeRoom)
              .emit("player_joined", dbPlayer);
          }

          if (!hasOwner) {
            this.io
              .to(socket.data.activeRoom)
              .emit("room_config_updated", room.roomConfig);
          }

          this.io
            .to(socket.data.activeRoom)
            .emit("players_updated", room.players);

          cb?.();
          print.success("join_room: completed");
        } catch (error) {
          print.error(error);
          //TODO: create error types and a way to differentiate system_error and user_error
          return socket.emit("system_error", error);
        }
      });
    });
  }
}
