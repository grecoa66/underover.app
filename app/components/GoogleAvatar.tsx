import Image from "next/image";
import Link from "next/link";

const GoogleAvatar = async ({
  user,
}: {
  user?: {
    id: number;
    image: string | null;
  };
}) => {
  return (
    <Link href={`/user/${user?.id}`}>
      {user?.image && (
        <Image
          src={user?.image}
          width="20"
          height="20"
          className="h-10 w-10 rounded-full"
          referrerPolicy="no-referrer"
          alt="Picture of the author"
        />
      )}
    </Link>
  );
};

export default GoogleAvatar;
