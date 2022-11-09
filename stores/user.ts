import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";

import { AUTH_PROVIDERS, LOCAL_USER_KEY } from "~/constants";
import { User, UserSchema } from "~/types";
import { generateLocalUser } from "~/services/browserAuth";
import * as localStorageService from "~/services/storage";

const onBrowserAuth = async (name: string) => {
  const localUser = await generateLocalUser(name);
  const parsedUser = UserSchema.parse(localUser);
  return parsedUser;
};

type UserState = {
  user: User | null;
  signIn: (provider: keyof typeof AUTH_PROVIDERS, name?: string) => void;
  signOut: () => void;
  setUser: (user: User) => void;
};

const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    user: null,
    signIn: async (provider: keyof typeof AUTH_PROVIDERS, name?: string) => {
      if (provider === AUTH_PROVIDERS.browser && name) {
        const localUser = await onBrowserAuth(name);
        localStorageService.setItem(localUser, LOCAL_USER_KEY);
        set({ user: localUser });
        return;
      }
      nextAuthSignIn(provider);
    },
    signOut: async () => {
      const user = get().user;
      if (user?.provider === AUTH_PROVIDERS.browser) {
        localStorageService.removeItem(LOCAL_USER_KEY);
        set({ user: null });
        return;
      }
      nextAuthSignOut();
    },
    setUser: (user: User) => set({ user }),
  }))
);

export default useUserStore;
