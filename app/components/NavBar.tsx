import Link from "next/link";
import DarkModeButton from "./DarkMode";
import AuthButton from "./AuthButton";
import GoogleAvatar from "./GoogleAvatar";
import { getCurrentUser } from "../api/auth/getUser";

// Slightly modified nav bar for the under/overs app
export const UONavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 h-20">
      <div className="flex flex-row items-center justify-between bg-gray-200 p-4 dark:bg-black">
        <Link href="/under-over">
          <h2 className="text-xl font-bold text-everglade">Under Overs</h2>
        </Link>
        <div className="flex flex-row space-x-4">
          <DarkModeButton />
          <GoogleAvatar user={currentUser} />
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

const NavBar = () => (
  <div className="sticky top-0 h-20">
    <div className="flex flex-row justify-between bg-white p-4 dark:bg-black">
      <Link href="/">
        <h2 className="text-xl text-everglade">A</h2>
      </Link>
      <DarkModeButton />
    </div>
  </div>
);

export default NavBar;
