"use client";

import GitHub from "./icons/github";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

type User = {
  name: string | null | undefined;
  image: string | null | undefined;
  email: string | null | undefined;
};

export const ConnectWithGitHub = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      setUser(session?.user as User);
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <button onClick={() => signOut()} className="flex items-center gap-3">
        <Image
          width={35}
          height={35}
          src={user?.image || "/placeholder.png"}
          alt={user?.name || "User Image"}
          className="rounded-full"
        />
        <div>
          <p>{user?.name}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      className="bg-gray-700 flex items-center gap-3 text-white px-10 py-3 rounded-md"
      onClick={() => signIn()}
    >
      <GitHub />
      Connect With GitHub
    </button>
  );
};
