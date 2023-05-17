import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faPersonThroughWindow,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '~/components/atoms';
import { extractProviderIcon, isPlayer } from '~/utils';

import type { DropdownMenuProps } from './DropdownMenu.types';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  user,
  onLogout,
  onPlayerTypeToggle,
  onPlayerLeaveRoom,
}) => {
  if (!user) return null;

  let displayName: string;
  let subtitle: string;
  let mainMenu: React.ReactNode;

  if (isPlayer(user)) {
    const isObserver = user.type === 'OBSERVER';
    displayName = user.name;
    subtitle = user.type.toUpperCase();
    mainMenu = (
      <DropdownMenuPrimitive.Group className="border-t border-bgLight pt-2">
        <MenuItem
          onClick={onPlayerTypeToggle}
          className="cursor-pointer hover:bg-bgDark"
          adornment={
            <FontAwesomeIcon icon={isObserver ? faToggleOn : faToggleOff} />
          }
        >
          Observer mode
        </MenuItem>
        <MenuItem
          onClick={onPlayerLeaveRoom}
          className="cursor-pointer hover:bg-bgDark"
          adornment={<FontAwesomeIcon icon={faPersonThroughWindow} />}
        >
          Leave room
        </MenuItem>
      </DropdownMenuPrimitive.Group>
    );
  } else {
    displayName = user.displayName;
    subtitle = user.provider.toUpperCase();
    mainMenu = null;
  }

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className="focus:outline-none active:outline-none">
        {trigger}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className="z-10 w-56 rounded-xl bg-bgMedium pb-4">
          <DropdownMenuPrimitive.Label className="py-6">
            <MenuItem
              adornment={
                <FontAwesomeIcon
                  icon={extractProviderIcon(user.provider)}
                  size="xl"
                />
              }
            >
              <h4 className="text-base font-bold text-txtLight">
                {displayName}
              </h4>
              <h5 className="text-xs font-black text-orange-300">
                .::{subtitle}::.
              </h5>
            </MenuItem>
          </DropdownMenuPrimitive.Label>
          {mainMenu}
          <DropdownMenuPrimitive.Group className="mt-2 border-t border-bgLight pt-2">
            <DropdownMenuPrimitive.Item className="cursor-pointer hover:bg-bgDark">
              <MenuItem
                onClick={onLogout}
                adornment={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
              >
                Logout
              </MenuItem>
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Group>
          <DropdownMenuPrimitive.Separator />
          <DropdownMenuPrimitive.Arrow />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};
