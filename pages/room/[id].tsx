import { motion } from "framer-motion";
import { useState } from "react";
import {
  MainNavbar,
  MainBackground,
  PlayersPanel,
  RoomManager,
  GameController,
  GameBoard,
} from "~/components";
import { LoadingState } from "~/components/molecules/LoadingState";

import { NAV_KEY_ID, ROOM_KEY_ID } from "~/constants";
import { DocumentRoom } from "~/types";
import dbConnect from "~/models/Room.helper";
import { MongoDatabase } from "~/models";

export const getServerSideProps = async ({ params }: any) => {
  await dbConnect();
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

  return (
    <MainBackground>
      <div className="main-board-container">
        <div className="[grid-area:nav]">
          <MainNavbar
            className="z-10 min-h-[100px]"
            initialRoom={room}
            id="board"
          />
        </div>
        <div className="[grid-area:main]">
          <motion.div
            className="relative grid h-full w-full grid-cols-[auto_1fr] overflow-hidden rounded-tr-pk_lg bg-bgLight md:grid-cols-[240px_1fr]"
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
            </motion.div>
            <div>
              <RoomManager room={room} />
              <GameController />
              <GameBoard />
            </div>
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
