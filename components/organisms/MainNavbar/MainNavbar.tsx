import { motion } from 'framer-motion';

import { Brand } from '~/components/molecules';
import { NAV_KEY_ID } from '~/constants';
import { useBoundStore } from '~/stores';

import { UserManager } from '../UserManager';
import type { MainNavbarProps } from './MainNavbar.types';

export const MainNavbar: React.FC<MainNavbarProps> = ({
  initialRoom,
  className,
}) => {
  const signOut = useBoundStore((state) => state.signOut);

  const isRoomBoard = Boolean(initialRoom);

  return (
    <motion.nav
      className={`mx-auto h-full max-h-28 w-full px-4 ${
        isRoomBoard ? '' : 'container'
      } ${className}`}
      layoutId={NAV_KEY_ID}
      transition={{ duration: 0.5 }}
    >
      <ul className="mx-auto flex h-full items-center justify-end gap-9 px-4 md:px-0">
        <li className="mr-auto">
          <Brand />
        </li>
        <li
          className="hidden font-semibold text-txtMedium md:block"
          onClick={signOut}
        >
          Features
        </li>
        <li className="hidden font-semibold text-txtMedium md:block">
          Premium
        </li>
        <li>
          <UserManager _isRoomBoard={isRoomBoard} />
        </li>
      </ul>
    </motion.nav>
  );
};
