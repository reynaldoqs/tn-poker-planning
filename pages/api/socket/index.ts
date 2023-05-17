import print from 'consola';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import type { ServerOptions } from 'socket.io';
import { Server } from 'socket.io';

import dbConnect from '~/services/storage/mongodb/connection.server';
import { MongoDatabase } from '~/services/storage/mongodb/roomdbManagger.server';
import { RoomSocketManager } from '~/socket/socketManager.server';

const socketHandler = async (
  _: NextApiRequest,
  res: NextApiResponse & {
    socket: {
      server: ServerOptions & { io: Server };
    };
  }
) => {
  await dbConnect();

  if (res.socket.server.io) {
    print.info('Socket is already running');
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    const db = MongoDatabase.Instance;

    const roomSocketManager = new RoomSocketManager(io, db);
    roomSocketManager.subscribeToClientRequests();
  }
  res.end();
};

export default socketHandler;
