"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "./Button";

const AuthButton = () => {
  const session = useSession();
  return (
    <>
      {session.status === "authenticated" ? (
        <Button
          type="button"
          text="Log Out"
          onClick={() => {
            signOut();
          }}
        />
      ) : (
        <Button
          type="button"
          text="Log In"
          onClick={() => {
            signIn();
          }}
        />
      )}
    </>
  );
};

export default AuthButton;
