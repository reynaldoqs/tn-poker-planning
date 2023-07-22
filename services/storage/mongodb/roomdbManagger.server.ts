import type {
  BoardConfig,
  BoardStatus,
  DocumentRoom,
  Player,
  Room,
  RoomConfig,
} from '~/types';
import { isAuthorizedToManage } from '~/utils';

import { RoomModel } from './models';
import type { RoomDatabase } from './roomdb.types';

export class MongoDatabase implements RoomDatabase {
  private static _instance: MongoDatabase;

  private constructor() {}

  public static get Instance() {
    const instance = this._instance || (this._instance = new this());
    return instance;
  }

  public async createRoom(room: Room) {
    const nRoom: DocumentRoom = new RoomModel<Room>(room);
    const response = await nRoom.save();
    return response;
  }

  public async getRoom(roomId: string) {
    const response = await RoomModel.findById(roomId);
    return response as DocumentRoom;
  }

  public async updatePlayer(roomId: string, player: Player) {
    const response = await RoomModel.findOneAndUpdate(
      {
        _id: roomId,
        'players.playerId': player.playerId,
      },
      {
        $set: {
          'players.$.reaction': player.reaction,
          'players.$.avatar': player.avatar,
          'players.$.cardBackground': player.cardBackground,
          'players.$.name': player.name,
          'players.$.status': player.status,
          'players.$.type': player.type,
          'players.$.voteValue': player.voteValue,
        },
      },
      { new: true }
    );
    return response as DocumentRoom;
  }

  public async updatePlayerStatus(
    roomId: string,
    playerId: string,
    status: Room['players'][number]['status']
  ) {
    const response = await RoomModel.findOneAndUpdate(
      {
        _id: roomId,
        'players.playerId': playerId,
      },
      {
        $set: {
          'players.$.status': status,
        },
      },
      { new: true }
    );
    return response as DocumentRoom;
  }

  public async pushPlayer(roomId: string, player: Player) {
    const response = await RoomModel.findByIdAndUpdate(
      roomId,
      {
        $push: { players: player },
      },
      { new: true }
    );
    return response as DocumentRoom;
  }

  public async removePlayer(roomId: string, player: Player) {
    const response = await RoomModel.findByIdAndUpdate(
      roomId,
      {
        $pull: { players: { playerId: player.playerId } },
      },
      { new: true }
    );
    return response as DocumentRoom;
  }

  public async resetPlayers(roomId: string) {
    const response = await RoomModel.findByIdAndUpdate(
      {
        _id: roomId,
      },
      {
        $set: {
          [`players.$[outer].voteValue`]: '',
          [`players.$[outer].reaction`]: '',
        },
      },
      { arrayFilters: [{ 'outer.type': 'PLAYER' }] }
    );
    return response as DocumentRoom;
  }

  public async updateRoomConfig(roomId: string, config: Partial<RoomConfig>) {
    const configToUpdate = {
      ...(config.authentication && {
        'roomConfig.authentication': config.authentication,
      }),
      ...(config.issues && {
        'roomConfig.issues': config.issues,
      }),
      ...(config.owner && {
        'roomConfig.owner': config.owner,
      }),
      ...(config.title && {
        'roomConfig.title': config.title,
      }),
      ...(config.whoCanManage && {
        'roomConfig.whoCanManage': config.whoCanManage,
      }),
      ...(config.withTimer && {
        'roomConfig.withTimer': config.withTimer,
      }),
    };

    const response = await RoomModel.findOneAndUpdate(
      { _id: roomId },
      { $set: configToUpdate },
      { new: true }
    );

    return response as DocumentRoom;
  }

  public async updateBoardStatus(
    roomId: string,
    status: BoardStatus,
    playerId: string
  ): Promise<DocumentRoom | undefined> {
    const room = await RoomModel.findById(roomId);
    if (!room) return;
    const isPlayerAuthorized = isAuthorizedToManage(room, playerId);
    if (!isPlayerAuthorized) return;
    room.boardStatus = status;
    const response = await room.save();
    return response as DocumentRoom;
  }

  public async updateBoardConfig(roomId: string, config: Partial<BoardConfig>) {
    const room = await RoomModel.findById(roomId);
    if (!room) return;
    const updatedConfig = { ...room.boardConfig, ...config };
    room.boardConfig = updatedConfig;
    const response = await room.save();
    return response as DocumentRoom;
  }
}
