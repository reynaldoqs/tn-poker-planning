import { NextJsAuthProvider } from "~/types";

export type SocialAuthButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  provider: keyof NextJsAuthProvider;
};
