import Link from "next/link";
import { DarkModeButton } from "../../components/DarkMode";
import AuthButton from "../../components/AuthButton";
import GoogleAvatar from "../../components/GoogleAvatar";
import { getCurrentUser } from "../../api/auth/getUser";

// Slightly modified nav bar for the under/overs app
export const UONavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 h-16">
      <div className="flex flex-row items-center justify-between bg-gray-200 p-4 dark:bg-black">
        <Link href="/over-under">
          <h2 className="text-xl font-bold text-everglade">Over Under</h2>
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
