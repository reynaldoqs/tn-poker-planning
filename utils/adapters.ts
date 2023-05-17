import type { PLAYER_TYPES } from '~/constants';
import type { Player, User } from '~/types';

export const userToPlayerAdapter = (
  user: User,
  role: (typeof PLAYER_TYPES)[number]
) => {
  const player: Player = {
    status: 'CONNECTED',
    type: role,
    name: user.displayName,
    provider: user.provider,
    playerId: user.userId,
    avatar: user.avatar,
  };

  return player;
};
