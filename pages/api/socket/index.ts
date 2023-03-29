import { NextApiRequest, NextApiResponse } from 'next/types';
import { Server, ServerOptions } from 'socket.io';
import print from 'consola';

import dbConnect from '~/models/Room.helper';
import { RoomSocketManager } from '~/listeners/socketManager.server';
import { MongoDatabase } from '~/models/roomStoreManager';

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
