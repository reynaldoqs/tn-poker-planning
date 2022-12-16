import { useEffect, useSyncExternalStore } from "react";
import { RoomSocketManager } from "~/listeners/socketManager.client";
import useRoomStore from "~/stores/room";
import useUserStore from "~/stores/user";
import { DocumentRoom } from "~/types";
import { userToPlayer } from "~/utils";

let itAlreadyExecutedSubscribe = false;

export const RoomManager: React.FC<{ room: DocumentRoom }> = ({ room }) => {
  const { setConnected, setRoomConfig, setJoined } = useRoomStore();

  const user = useUserStore((state) => state.user);

  // useEffect(() => {
  //   if (!user || itAlreadyExecutedSubscribe) return;
  //   const roomSocketManager = RoomSocketManager.Instance;

  //   roomSocketManager.init(room, () => {
  //     setConnected(true);
  //     roomSocketManager.subscribeOnConnect();
  //   });
  //   itAlreadyExecutedSubscribe = true;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);
  return <></>;
};
