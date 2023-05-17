import print from 'consola';
import { Server } from 'socket.io';

import { RoomDatabase } from '~/services/storage/mongodb/roomDB.types';
import { Player } from '~/types';
import { extractParticipant, includesParticipant } from '~/utils';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './socketManager.types';

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
    this.io.on('connection', (socket) => {
      this.io.on('disconnect', async (reason) => {
        try {
          const activeRoomId = socket.data.activeRoom;
          const socketPlayer = socket.data.player;

          if (!activeRoomId || !socketPlayer)
            throw 'playerId or roomId not found';

          // when disconnecting after leave room it throw an error (sync error)
          const updatedRoom = await this.db.updatePlayerStatus(
            activeRoomId,
            socketPlayer.playerId,
            'DISCONNECTED'
          );
          if (!updatedRoom)
            throw `error updating player::[${socketPlayer.playerId}]:[${socketPlayer.name}] status to DISCONNECTED`;

          socket.broadcast
            .to(activeRoomId)
            .emit('player_disconnected', socketPlayer, reason);

          this.io.to(activeRoomId).emit('players_updated', updatedRoom.players);
          print.success('player_disconnected: completed');
        } catch (error) {
          print.error(error);
          return socket.emit('system_error', error);
        }
      });

      socket.on('join_room', async (roomId, player, cb) => {
        try {
          if (!player.playerId) throw 'player id not found';
          let isReconnection = false;
          let room = await this.db.getRoom(roomId);
          if (!room) throw 'room not found.';

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
            if (!room) throw 'insert participant failed.';
          } else {
            // reconnection
            room = await this.db.updatePlayerStatus(
              roomId,
              player.playerId,
              'CONNECTED'
            );
            isReconnection = true;
            if (!room) throw 'update participant status failed.';
          }

          const dbPlayer: Player = extractParticipant(room, player.playerId);

          socket.join(roomId);
          socket.data.activeRoom = roomId;
          socket.data.player = player;

          socket.join(roomId);
          socket.data.activeRoom = roomId;
          socket.data.player = player;

          if (isReconnection) {
            socket.broadcast
              .to(socket.data.activeRoom)
              .emit('player_reconnected', dbPlayer);
          } else {
            socket.broadcast
              .to(socket.data.activeRoom)
              .emit('player_joined', dbPlayer);
          }

          if (!hasOwner) {
            this.io
              .to(socket.data.activeRoom)
              .emit('room_config_updated', room.roomConfig);
          }

          this.io
            .to(socket.data.activeRoom)
            .emit('players_updated', room.players);

          cb?.();
          print.success('join_room: completed');
        } catch (error) {
          print.error(error);
          return socket.emit('system_error', error);
        }
      });

      socket.on('leave_room', async (player) => {
        try {
          if (!socket.data.activeRoom) throw 'room not found';

          const updatedRoom = await this.db.removePlayer(
            socket.data.activeRoom,
            player
          );
          if (!updatedRoom) throw 'error removing player.';

          socket.broadcast
            .to(socket.data.activeRoom)
            .emit('player_left', player);

          this.io
            .to(socket.data.activeRoom)
            .emit('players_updated', updatedRoom.players);
          socket.data.activeRoom = undefined;
          socket.data.player = undefined;
          return;
        } catch (error) {
          print.error(error);
          return socket.emit('system_error', error);
        }
      });

      socket.on('update_room_config', async (roomConfig, player) => {
        try {
          if (!socket.data.activeRoom) throw 'room not found';

          const updatedRoom = await this.db.updateRoomConfig(
            socket.data.activeRoom,
            roomConfig,
            player.playerId
          );
          if (!updatedRoom) throw 'error updating room configuration';

          return this.io
            .to(socket.data.activeRoom)
            .emit('room_config_updated', updatedRoom.roomConfig);
        } catch (error) {
          print.error(error);
          return socket.emit('system_error', error);
        }
      });

      socket.on('update_board_status', async (incomingBoardStatus, player) => {
        try {
          if (!socket.data.activeRoom) throw 'activeRoom not found';
          // @TODO: find a way to skip getRoom func when board status is not PROGRESS
          let room = await this.db.getRoom(socket.data.activeRoom);
          const previousBoardStatus = room.boardStatus;

          if (!room) throw 'room not found real room.';

          const isReset =
            previousBoardStatus === 'SHOWING_RESULTS' &&
            incomingBoardStatus === 'VOTING';

          if (isReset) {
            room = await this.db.resetPlayers(socket.data.activeRoom);
          }

          const updatedRoom = await this.db.updateBoardStatus(
            socket.data.activeRoom,
            incomingBoardStatus,
            player.playerId
          );

          if (!updatedRoom) throw 'error updating board status.';

          if (isReset) {
            this.io
              .to(socket.data.activeRoom)
              .emit('players_updated', updatedRoom.players);
          }

          return this.io
            .to(socket.data.activeRoom)
            .emit('board_status_updated', updatedRoom.boardStatus);
        } catch (error) {
          print.error(error);
          return socket.emit('system_error', error);
        }
      });

      socket.on('update_board_config', async (boardConfig, player) => {
        try {
          if (!socket.data.activeRoom) throw 'room not found';

          const updatedRoom = await this.db.updateBoardConfig(
            socket.data.activeRoom,
            boardConfig,
            player.playerId
          );
          if (!updatedRoom) throw 'error updating board configuration';

          return this.io
            .to(socket.data.activeRoom)
            .emit('board_config_updated', updatedRoom.boardConfig);
        } catch (error) {
          print.error(error);
          return socket.emit('system_error', error);
        }
      });

      socket.on('update_player', async (incomingPlayer) => {
        // use partial
        // if socket player is admin he can edit other players, and if not it can edit it self only
        try {
          if (!socket.data.activeRoom) throw 'room not found';
          if (!socket.data.player) throw 'current player not found';
          const currentPlayer = socket.data.player;

          const isSelfUpdate =
            currentPlayer.playerId === incomingPlayer.playerId ||
            !incomingPlayer.playerId;

          let playerToUpdate: Player;

          if (isSelfUpdate) {
            playerToUpdate = { ...currentPlayer, ...incomingPlayer };
          } else {
            //TODO: check if playerId is part of admins
            playerToUpdate = incomingPlayer as Player; //TODO: use PlayerSchema to validate playerId and other fields
          }

          const updatedRoom = await this.db.updatePlayer(
            socket.data.activeRoom,
            playerToUpdate
          );
          if (!updatedRoom) throw 'error updating player';

          // @INFO: Manage localPlayer with local states
          // if (player.playerId === socket.player?.playerId) {
          //   socket.player = player;
          //   return socket.emit(response.localPlayerUpdated, player);
          // }

          return this.io
            .to(socket.data.activeRoom)
            .emit('players_updated', updatedRoom.players);
        } catch (error) {
          print.error(error);
          return socket.emit('system_error', error);
        }
      });
    });
  }
}
