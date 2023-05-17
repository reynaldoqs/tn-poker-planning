import type { NextApiRequest, NextApiResponse } from 'next';

import { MongoDatabase } from '~/services/storage/mongodb/roomdbManagger.server';

export default async function handler(
  { query: { id }, method }: NextApiRequest,
  res: NextApiResponse
) {
  if (method === 'GET' && typeof id === 'string') {
    const db = MongoDatabase.Instance;
    const room = await db.getRoom(id);
    if (!room)
      return res
        .status(404)
        .json({ message: `room with id: ${id} not found.` });
    return res.status(200).json(room);
  }
  return res.status(400).json({ message: 'method not implemented' });
}
