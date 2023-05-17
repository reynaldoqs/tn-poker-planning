import type { AUTH_PROVIDERS } from '~/constants';

export type AuthFormProps = {
  className?: string;
  onLogin: (provider: keyof typeof AUTH_PROVIDERS, name?: string) => void;
};
