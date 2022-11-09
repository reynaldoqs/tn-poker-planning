import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { AUTH_PROVIDERS } from "~/constants";
import type { User } from "~/types";

const AVATAR_PROVIDER = "https://avatars.dicebear.com/api/open-peeps/";

const fpPromise = typeof window === "undefined" ? null : FingerprintJS.load();

const getBrowserId = async (): Promise<string> => {
  if (!fpPromise) return "";
  const fp = await fpPromise;
  const result = await fp.get();
  const providerId = result.visitorId;
  return providerId;
};

export const generateLocalUser = async (name: string): Promise<User> => {
  const visitorId = await getBrowserId();
  const avatar = `${AVATAR_PROVIDER}${visitorId}.svg?background=%23ff535f`; // `${AVATAR_PROVIDER}${providerId}.svg?background=%23000000`
  const localUser: User = {
    displayName: name,
    userId: visitorId,
    avatar: avatar,
    provider: AUTH_PROVIDERS.browser,
  };
  return localUser;
};
