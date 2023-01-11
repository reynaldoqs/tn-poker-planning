import { useEffect } from "react";

import { RoomSocketManager } from "~/listeners/socketManager.client";
import { useBoundStore } from "~/stores";
import { DocumentRoom } from "~/types";
import { userToPlayer } from "~/utils";

let executed = false;

export const RoomManager: React.FC<{ room: DocumentRoom }> = ({ room }) => {
  const join = useBoundStore((state) => state.join);
  const user = useBoundStore((state) => state.user);
  const connected = useBoundStore((state) => state.connected);
  const checkoutPlayer = useBoundStore((state) => state.checkoutPlayer);
  const loadInitialRoom = useBoundStore((state) => state.loadInitialRoom);

  useEffect(() => {
    // let unSubscribeBoardStatus: (() => void) | null = null;

    if (user && connected && !executed) {
      const roomSocketManager = RoomSocketManager.Instance;
      roomSocketManager.roomId = room._id;
      const currentPlayer = userToPlayer(user!, "PLAYER");
      checkoutPlayer(currentPlayer);
      join(currentPlayer);
      loadInitialRoom(room);
      // unSubscribeBoardStatus = useBoundStore.subscribe((state, prevState) => {
      //   console.log(
      //     "prev:",
      //     state.boardStatus,
      //     " next:",
      //     prevState.boardStatus
      //   );
      // });
      executed = true;
    }

    // return () => {
    //   unSubscribeBoardStatus?.();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, connected]);
  return <>connected: {connected.toString()}</>;
};
