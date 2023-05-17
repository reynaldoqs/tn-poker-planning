import { cruder } from '~/lib';
import { DocumentRoom, Room } from '~/types';

const rooms = cruder('/api')('room');

export const createRoom = (room: Room): Promise<DocumentRoom> =>
  rooms.create<Room, DocumentRoom>(room);

export const readRoom = (roomId: string) => rooms.read<Room>(roomId);
