import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react';
import { StateCreator } from 'zustand';

import { AUTH_PROVIDERS, LOCAL_USER_KEY } from '~/constants';
import { generateLocalUser } from '~/services/browserAuth';
import * as localStorageService from '~/services/storage';
import { User, UserSchema } from '~/types';
import { RoomSlice } from './roomSlice.types';
import { UserSlice } from './userSlice.types';

const signInWithBrowser = async (name: string) => {
  const validatedUser = UserSchema.parse(await generateLocalUser(name));
  return validatedUser;
};

const createUserSlice: StateCreator<
  UserSlice & RoomSlice,
  [['zustand/devtools', never]],
  [],
  UserSlice
> = (set, get) => ({
  user: null,
  signIn: async (provider: keyof typeof AUTH_PROVIDERS, name?: string) => {
    if (provider === AUTH_PROVIDERS.browser && name) {
      const user = await signInWithBrowser(name);
      localStorageService.setItem(user, LOCAL_USER_KEY);
      set((state) => ({ ...state, user }));
    } else {
      nextAuthSignIn(provider);
    }
  },
  signOut: async () => {
    const user = get().user;
    if (user?.provider === AUTH_PROVIDERS.browser) {
      localStorageService.removeItem(LOCAL_USER_KEY);
      set((state) => ({ ...state, user: null }));
    } else {
      nextAuthSignOut();
    }
  },
  setUser: (user: User) => set((state) => ({ ...state, user })),
});

export default createUserSlice;
