import { z } from 'zod';

import { AUTH_PROVIDERS } from '~/constants';

// export const StreetSchema = z.object({
//   location: z.string(),
// });

//export const CitizenSchema = UserSchema.merge(StreetSchema);

//export type Citizen = z.infer<typeof CitizenSchema>;

//const arraySchema = z.array(UserSchema);

// export type ArrayType = z.infer<typeof arraySchema>;

// const testSchema = z.string().optional().array();

// type Prueba = z.infer<typeof testSchema>;

export const UserSchema = z.object({
  provider: z.nativeEnum(AUTH_PROVIDERS),
  displayName: z.string(),
  userId: z.string(),
  avatar: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export type NextJsAuthProvider = Omit<typeof AUTH_PROVIDERS, 'browser'>;
