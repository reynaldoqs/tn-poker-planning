import type { Player, Room, User } from '~/types';

export const isPlayer = (input: User | Player): input is Player => {
  return 'type' in input && 'playerId' in input; 
};

export const isAuthorizedToManage = (room: Room, playerId: string) => {
  if (room.roomConfig.whoCanManage === 'OWNER') {
    return playerId === room.roomConfig?.owner?.providerId;
  }
  if (room.roomConfig.whoCanManage === 'ANYONE') {
    return Boolean(room.players.find((p) => p.playerId === playerId));
  }
  return false;
};

export const includesParticipant = (room: Room, player: Player) => {
  if (!room.players || !room.players.length || !player) return false;
  return !!room.players.find((p) => p.playerId === player.playerId);
};
