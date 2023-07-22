import type { AUTH_PROVIDERS } from '~/constants';
import type { User } from '~/types';

export type UserSlice = {
  user: User | null;
  signIn: (provider: keyof typeof AUTH_PROVIDERS, name?: string) => void;
  signOut: () => void;
  setUser: (user: User) => void;
};
