import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as localStorageService from "~/services/storage";
import { LOCAL_USER_KEY } from "~/constants";
import { User, UserSchema } from "~/types";
import useUserStore from "~/stores/user";
import { Avatar, Button, Modal } from "~/components/atoms";
import { DropdownMenu } from "~/components/molecules";

import { AuthForm } from "../AuthForm";

export const UserManager: React.FC = () => {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const signIn = useUserStore((state) => state.signIn);
  const signOut = useUserStore((state) => state.signOut);
  const currentUser = useUserStore((state) => state.user);

  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (status !== "unauthenticated") return;
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
      </Modal>
    </>
  );
};
