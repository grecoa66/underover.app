import Image from "next/image";

const GoogleAvatar = async ({
  user,
}: {
  user: {
    image: string | null;
  } | null;
}) => {
  return (
    <>
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
    </>
  );
};

export default GoogleAvatar;
