import primsaClient from "../utils/prismaClient";

interface IParams {
  userId: string;
}
export const getUserProjects = async (params: IParams) => {
  const { userId } = params;
  if (!userId || typeof userId !== "string") {
    return null;
  }
  const projects = await primsaClient.project.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  const safeProjects = projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    user: {
      ...project.user,
      createdAt: project.user.createdAt.toISOString(),
      emailVerified: project.user.emailVerified?.toISOString(),
      updatedAt: project.user.updatedAt.toISOString(),
    },
  }));
  return safeProjects;
};
