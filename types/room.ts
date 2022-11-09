import { z } from "zod";
import type { Document } from "mongoose";
import type { Socket } from "socket.io";

import {
  ISSUE_STATUS,
  AUTH_PROVIDERS,
  MANAGE_OPTIONS,
  VOTE_TYPES,
  BOARD_STATUS,
  PLAYER_STATUS,
  AVAILABLE_REACTIONS,
  PLAYER_TYPES,
} from "~/constants";

export const RoomSchema = z.object({
  roomConfig: z.object({
    title: z.string().min(3).max(40),
    issues: z
      .array(
        z.object({
          name: z.string(),
          result: z.string().optional(),
          status: z.enum(ISSUE_STATUS),
        })
      )
      .optional(),
    owner: z
      .object({
        provider: z.nativeEnum(AUTH_PROVIDERS),
        providerId: z.string(),
      })
      .optional(),
    whoCanManage: z.enum(MANAGE_OPTIONS),
    authentication: z.object({
      required: z.boolean(),
      allowedProviders: z.array(z.nativeEnum(AUTH_PROVIDERS)).optional(),
      extensions: z.array(z.string()).optional(),
    }),
    withTimer: z.boolean().optional(),
    withReactions: z.boolean().optional(),
  }),
  boardConfig: z.object({
    voteValues: z.array(z.string()),
    voteType: z.enum(VOTE_TYPES),
  }),
  boardStatus: z.enum(BOARD_STATUS),
  players: z.array(
    z.object({
      name: z.string(),
      avatar: z.string().optional(),
      cardBackground: z.string().optional(),
      provider: z.nativeEnum(AUTH_PROVIDERS),
      playerId: z.string(),
      voteValue: z.string().nullable().optional(),
      status: z.enum(PLAYER_STATUS),
      reaction: z.enum(AVAILABLE_REACTIONS).nullable().optional(),
      type: z.enum(PLAYER_TYPES),
    })
  ),
});
export type Room = z.infer<typeof RoomSchema>;

export type DocumentRoom = Document & Room;

export type RoomConfig = Room["roomConfig"];

export type RoomIssue = Exclude<RoomConfig["issues"], undefined>[number];

export type BoardConfig = Room["boardConfig"];

export type BoardStatus = Room["boardStatus"];

// To avoid spam db/server with countdown room state
export type LocalBoardStatus = BoardStatus | "COUNTING_DOWN";

export type Player = Room["players"][number];

export type RoomSocket = Socket & { activeRoom?: string; player?: Player };
