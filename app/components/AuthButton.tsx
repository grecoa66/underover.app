"use client";
import { useSession, signOut, signIn } from "next-auth/react";

const buttonClass =
  "border-2 rounded-lg border-everglade p-2 hover:bg-everglade hover:border-everglade-600 hover:text-white";

const AuthButton = () => {
  const session = useSession();
  return (
    <>
      {session.status === "authenticated" ? (
        <button
          type="button"
          className={buttonClass}
          onClick={() => {
            signOut();
          }}
        >
          Log Out
        </button>
      ) : (
        <button
          type="button"
          className={buttonClass}
          onClick={() => {
            signIn();
          }}
        >
          Log In
        </button>
      )}
    </>
  );
};

export default AuthButton;
