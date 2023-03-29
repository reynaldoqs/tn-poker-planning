import { useRef } from 'react';

import { Button, Input, Label } from '~/components/atoms';
import { SocialAuthButton } from '~/components/molecules';

import { AuthFormProps } from './AuthForm.types';

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin, className }) => {
  const browserUserName = useRef<HTMLInputElement>(null);
  const onBrowserLogin = () => {
    const userName = browserUserName?.current?.value;
    if (!userName) return;
    onLogin('browser', userName);
  };
  return (
    <form
      className={`flex min-w-[256px] flex-col gap-6 pb-2 text-center ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        onBrowserLogin();
      }}
    >
      <fieldset className="mt-4 text-left">
        <Label htmlFor="game_title">User name</Label>
        <Input
          id="game_title"
          placeholder="user name"
          className="mt-2"
          ref={browserUserName}
        />
      </fieldset>
      <Button title="Continue" className="mx-auto w-full" />
      <h5 className="text-md text-txtDark">or continue with:</h5>
      <div className="flex justify-center gap-6">
        <SocialAuthButton
          provider="google"
          onClick={() => onLogin('google')}
          className="text-red-100"
        />
        <SocialAuthButton
          provider="github"
          onClick={() => onLogin('github')}
          className="text-white"
        />
        <SocialAuthButton
          provider="facebook"
          onClick={() => onLogin('facebook')}
          className="text-blue-200"
        />
      </div>
    </form>
  );
};
