import { getServerSession } from "next-auth/next";

import primsaClient from "../utils/prismaClient";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await primsaClient.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        Projects: true,
      },
    });
    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString(),
    };
  } catch (error) {
    return null;
  }
};
