import Link from "next/link";
import DarkModeButton from "./DarkMode";
import AuthButton from "./AuthButton";
import GoogleAvatar from "./GoogleAvatar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { prisma } from "../api/__prismaClient";

// Slightly modified nav bar for the under/overs app
export const UONavBar = async () => {
  const session = await getServerSession(authOptions);

  const loggedInUser = await prisma.users.findFirst({
    where: {
      email: session?.user?.email || "",
    },
  });

  return (
    <div className="sticky top-0">
      <div className="flex flex-row items-center justify-between bg-gray-200 p-4 dark:bg-black">
        <h2 className="text-xl font-bold text-everglade">Under Overs</h2>
        <div className="flex flex-row space-x-4">
          <DarkModeButton />
          <GoogleAvatar user={loggedInUser} />
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

const NavBar = () => (
  <div className="sticky top-0">
    <div className="flex flex-row justify-between bg-white p-4 dark:bg-black">
      <Link href="/">
        <h2 className="text-xl text-everglade">A</h2>
      </Link>
      <DarkModeButton />
    </div>
  </div>
);

export default NavBar;
