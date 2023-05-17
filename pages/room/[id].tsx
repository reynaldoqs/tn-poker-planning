import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import {
  GameBoard,
  MainBackground,
  MainNavbar,
  PlayersPanel,
} from '~/components';
import { LoadingState } from '~/components/molecules/LoadingState';
import { ROOM_KEY_ID } from '~/constants';
import { withInitialData } from '~/hocs';
import dbConnect from '~/services/storage/mongodb/connection.server';
import { MongoDatabase } from '~/services/storage/mongodb/roomdbManagger.server';
import { useBoundStore } from '~/stores';
import type { DocumentRoom } from '~/types';

export const getServerSideProps = async ({ params }: any) => {
  await dbConnect();
  const db = MongoDatabase.Instance;
  if (!db) return {};
  const room = await db.getRoom(params.id);
  return { props: { room: JSON.parse(JSON.stringify(room)) } };
};

const BackGroundWithLoadInitialData = withInitialData(MainBackground);

type RoomProps = {
  readonly room: DocumentRoom;
};

const Room: React.FC<RoomProps> = ({ room }) => {
  const subscribeRoomEvents = useBoundStore(
    (state) => state.subscribeRoomEvents
  );
  const [isLoading, setIsLoading] = useState(true);

  const clearStates = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    subscribeRoomEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BackGroundWithLoadInitialData room={room}>
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
            className="md:grid-cols-[240px_1fr] relative grid h-full w-full grid-cols-[auto_1fr] overflow-hidden rounded-tr-pk_lg bg-bgLight"
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
            <div className="h-full w-full">
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
    </BackGroundWithLoadInitialData>
  );
};

export default Room;
