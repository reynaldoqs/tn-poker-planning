import { Brand } from "~/components/molecules";
import useUserStore from "~/stores/user";

import { UserController } from "../UserController";
import { HomeNavbarProps } from "./HomeNavbar.types";

export const HomeNavbar: React.FC<HomeNavbarProps> = ({
  className,
  ...rest
}) => {
  const signOut = useUserStore((state) => state.signOut);
  return (
    <nav className={`h-full max-h-28 w-full ${className}`} {...rest}>
      <ul className="container mx-auto flex h-full items-center gap-9">
        <li>
          <Brand />
        </li>
        <li className="ml-auto font-semibold text-txtMedium" onClick={signOut}>
          Features
        </li>
        <li className="font-semibold text-txtMedium">Premium</li>
        <li>
          <UserController />
        </li>
      </ul>
    </nav>
  );
};
