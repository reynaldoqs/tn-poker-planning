import type { DropdownMenuProps as BaseProps } from '@radix-ui/react-dropdown-menu';

import type { Player, User } from '~/types';
export type DropdownMenuProps = BaseProps & {
  trigger: React.ReactElement;
  user: User | Player;
  onLogout?: () => void;
  onPlayerTypeToggle?: () => void;
  onPlayerLeaveRoom?: () => void;
};
