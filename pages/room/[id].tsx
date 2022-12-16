import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HomeNavbar,
  MainBackground,
  PlayersPanel,
  RoomManager,
} from "~/components";
import { LoadingState } from "~/components/molecules/LoadingState";
import Lottie from "react-lottie";
import calabazas from "~/public/assets/Calabazas.json";

import { ROOM_KEY_ID } from "~/constants";
import { DocumentRoom } from "~/types";
import dbConnect from "~/models/Room.helper";
import { MongoDatabase } from "~/models";

export const getServerSideProps = async ({ params }: any) => {
  await dbConnect();
  console.log("aqui es el 1");
  const db = MongoDatabase.Instance;
  if (!db) return {};
  const room = await db.getRoom(params.id);
  return { props: { room: JSON.parse(JSON.stringify(room)) } };
};

type RoomProps = {
  readonly room: DocumentRoom;
};

const Room: React.FC<RoomProps> = ({ room }) => {
  const [isLoading, setIsLoading] = useState(true);

  const clearStates = () => {
    setIsLoading(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: calabazas,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <MainBackground>
      {/* <Lottie
        options={defaultOptions}
        height={"100%"}
        width={"100%"}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 99999 }}
        isStopped={false}
        isPaused={false}
      /> */}
      <div className="main-board-container">
        <div className="[grid-area:nav]">
          <HomeNavbar className="z-10 min-h-[100px]" />
        </div>
        <pre>{JSON.stringify(room, null, 2)}</pre>
        <div className="[grid-area:main]">
          <motion.div
            className="relative grid h-full w-full grid-cols-[240px_1fr] overflow-hidden rounded-tr-pk_lg bg-bgLight"
            layoutId={ROOM_KEY_ID}
            transition={{ duration: 0.5 }}
          >
            <LoadingState isLoading={isLoading} />
            <motion.div
              initial={{ translateX: -300 }}
              animate={{
                translateX: 0,
              }}
              transition={{
                delay: 1.1,
                duration: 0.5,
              }}
            >
              <PlayersPanel />
              <RoomManager room={room} />
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ translateX: 500 }}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onAnimationComplete={clearStates}
          className="[grid-rea:sidebar]"
        ></motion.div>
      </div>
    </MainBackground>
  );
};

export default Room;
