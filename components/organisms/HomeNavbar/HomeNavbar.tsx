import { Brand } from "~/components/molecules";
import useUserStore from "~/stores/user";

import { UserManager } from "../UserManager";
import { HomeNavbarProps } from "./HomeNavbar.types";

export const HomeNavbar: React.FC<HomeNavbarProps> = ({
  className,
  ...rest
}) => {
  const signOut = useUserStore((state) => state.signOut);
  return (
    <nav className={`h-full max-h-28 w-full ${className}`} {...rest}>
      <ul className="container mx-auto flex h-full items-center justify-end gap-9 px-4 md:px-0">
        <li className="mr-auto">
          <Brand />
        </li>
        <li
          className="hidden font-semibold text-txtMedium md:block"
          onClick={signOut}
        >
          Features
        </li>
        <li className="hidden font-semibold text-txtMedium md:block">
          Premium
        </li>
        <li>
          <UserManager />
        </li>
      </ul>
    </nav>
  );
};
