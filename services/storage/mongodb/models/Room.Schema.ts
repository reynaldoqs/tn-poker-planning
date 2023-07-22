import mongoose, { Schema } from 'mongoose';

import {
    AUTH_PROVIDERS,
    AVAILABLE_REACTIONS,
    BOARD_STATUS,
    ISSUE_STATUS,
    MANAGE_OPTIONS,
    PLAYER_STATUS,
    PLAYER_TYPES,
    VOTE_TYPES,
} from '~/constants';
import type { DocumentRoom, Room } from '~/types';

// WARNING: This schema needs to stay synced with Room type in ./types/room.ts

const roomSchema = new Schema<DocumentRoom>({
  roomConfig: {
    title: { type: String, required: true },
    issues: [
      {
        _id: false,
        name: String,
        status: {
          type: String,
          enum: ISSUE_STATUS,
          default: ISSUE_STATUS[0],
        },
        result: String,
      },
    ],
    owner: {
      provider: {
        type: String,
        enum: Object.values(AUTH_PROVIDERS),
        required: false,
      },
      providerId: { type: String, required: false },
    },
    whoCanManage: {
      type: String,
      enum: MANAGE_OPTIONS,
      default: MANAGE_OPTIONS[0],
    },
    authentication: {
      required: { type: Boolean, default: false },
      allowedProviders: { type: [String], required: false },
      extensions: { type: [String], required: false },
    },
    withTimer: { type: Boolean, default: false },
  },
  boardConfig: {
    voteValues: [String],
    voteType: { type: String, enum: VOTE_TYPES, default: VOTE_TYPES[0] },
  },
  boardStatus: {
    type: String,
    enum: BOARD_STATUS,
    default: BOARD_STATUS[1],
  },
  players: [
    {
      _id: false,
      name: String,
      avatar: String,
      cardBackground: String,
      provider: {
        type: String,
        enum: Object.values(AUTH_PROVIDERS),
      },
      playerId: {
        type: String,
        required: true,
      },
      voteValue: String,
      status: {
        type: String,
        enum: PLAYER_STATUS,
        default: PLAYER_STATUS[0],
      },
      reaction: {
        type: String,
        enum: AVAILABLE_REACTIONS,
      },
      type: {
        type: String,
        enum: PLAYER_TYPES,
        default: PLAYER_TYPES[0],
      },
    },
  ],
});
const RoomModel =
  mongoose.models.Room ||
  mongoose.model<DocumentRoom, Room>('Room', roomSchema);

export default RoomModel;
