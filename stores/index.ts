import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createRoomSlice from './roomSlice';
import { RoomSlice } from './roomSlice.types';
import createUserSlice from './userSlice';
import { UserSlice } from './userSlice.types';

export const useBoundStore = create<UserSlice & RoomSlice>()(
  devtools(
    (...a) => ({
      ...createUserSlice(...a),
      ...createRoomSlice(...a),
    }),
    { enabled: true }
  )
);
