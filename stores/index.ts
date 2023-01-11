import create from "zustand";
import { devtools } from "zustand/middleware";

import { RoomSlice, UserSlice } from "./stores.types";
import createRoomSlice from "./room";
import createUserSlice from "./user";

export const useBoundStore = create<UserSlice & RoomSlice>()(
  devtools(
    (...a) => ({
      ...createUserSlice(...a),
      ...createRoomSlice(...a),
    }),
    { enabled: true }
  )
);
