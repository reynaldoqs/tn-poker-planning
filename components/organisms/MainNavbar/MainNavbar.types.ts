import type { Room } from '~/types';

export type MainNavbarProps = React.HTMLAttributes<HTMLDivElement> & {
  initialRoom?: Room;
};
