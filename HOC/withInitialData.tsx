import { ReactElement, useEffect } from 'react';

import { RoomSocketManager } from '~/listeners/socketManager.client';
import { useBoundStore } from '~/stores';
import { DocumentRoom } from '~/types';
import { userToPlayer } from '~/utils';

let executed = false;

export const withInitialData =
  <T extends unknown>(WrapperComponent: React.ComponentType<T>) =>
  // eslint-disable-next-line react/display-name
  (props: T & { room: DocumentRoom }): ReactElement => {
    const join = useBoundStore((state) => state.join);
    const user = useBoundStore((state) => state.user);
    const connected = useBoundStore((state) => state.connected);
    const checkoutPlayer = useBoundStore((state) => state.checkoutPlayer);
    const loadInitialRoom = useBoundStore((state) => state.loadInitialRoom);
    const { room } = props;

    useEffect(() => {
      if (user && connected && !executed) {
        const roomSocketManager = RoomSocketManager.Instance;
        roomSocketManager.roomId = room._id;
        const currentPlayer = userToPlayer(user!, 'PLAYER');
        checkoutPlayer(currentPlayer);
        join(currentPlayer);
        loadInitialRoom(room);
        executed = true;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, connected]);
    return <WrapperComponent {...props} />;
  };
