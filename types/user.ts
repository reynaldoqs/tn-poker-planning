import { z } from 'zod';

import { AUTH_PROVIDERS } from '~/constants';

export const UserSchema = z.object({
  provider: z.nativeEnum(AUTH_PROVIDERS),
  displayName: z.string(),
  userId: z.string(),
  avatar: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export type NextJsAuthProvider = Omit<typeof AUTH_PROVIDERS, 'browser'>;
