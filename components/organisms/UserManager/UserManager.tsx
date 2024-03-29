import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Avatar, Button, Modal } from '~/components/atoms';
import { DropdownMenu } from '~/components/molecules';
import { LOCAL_USER_KEY } from '~/constants';
import * as localStorageService from '~/services/storage';
import { useBoundStore } from '~/stores';
import type { User } from '~/types';
import { UserSchema } from '~/types';

import { AuthForm } from '../AuthForm';

export const UserManager: React.FC<{ _isRoomBoard: boolean }> = ({
  _isRoomBoard,
}) => {
  const { data: session, status } = useSession();
  const setUser = useBoundStore((state) => state.setUser);
  const signIn = useBoundStore((state) => state.signIn);
  const signOut = useBoundStore((state) => state.signOut);
  const currentUser = useBoundStore((state) => state.user);

  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (status !== 'unauthenticated') return;
    const localUser = localStorageService.getItem<User>(LOCAL_USER_KEY);
    if (localUser) {
      const parsedUser = UserSchema.parse(localUser);
      setUser(parsedUser);
    }
  }, [status, setUser]);

  useEffect(() => {
    if (session && session.user && session.user.name && session.user.image) {
      const localUser: User = {
        displayName: session.user.name,
        avatar: session.user.image,
        userId: String((session as any).sub),
        provider: String((session as any).provider) as any,
      };
      const parsedUser = UserSchema.parse(localUser);
      setUser(parsedUser);
    }
  }, [session, setUser]);
  return (
    <>
      {currentUser ? (
        <DropdownMenu
          user={currentUser}
          trigger={
            <Avatar src={currentUser.avatar} alt={currentUser.displayName} />
          }
          onLogout={signOut}
        />
      ) : (
        <Button title="Login" onClick={() => setShowAuthModal(true)} />
      )}
      <Modal
        title="Login"
        open={showAuthModal}
        defaultOpen={showAuthModal}
        onOpenChange={(val) => setShowAuthModal(val)}
      >
        <AuthForm
          onLogin={(provider, name) => {
            signIn(provider, name);
            setShowAuthModal(false);
          }}
        />
        v
      </Modal>
    </>
  );
};
