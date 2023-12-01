import { getServerSession } from "next-auth";
import { prisma } from "../__prismaClient";
import { authOptions } from "./[...nextauth]/route";

const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  const loggedInUser = await prisma.users.findFirst({
    where: {
      email: session?.user?.email || "",
    },
  });

  return loggedInUser || undefined;
};

const getCurrentUserById = async (userId: string) => {
  const loggedInUser = await prisma.users.findUnique({
    where: {
      id: Number(userId),
    },
  });

  return loggedInUser || undefined;
};

const requireUser = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw Error("Not Authenticated");
  }

  return user;
};

const requireAdmin = async () => {
  const user = await getCurrentUser();

  if (!user || !user.role || user.role !== "admin") {
    throw Error("Not Authorized");
  }

  return user;
};

export { getCurrentUser, getCurrentUserById, requireUser, requireAdmin };
