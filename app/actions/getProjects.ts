import primsaClient from "../utils/prismaClient";

export const getProjects = async () => {
  try {
    const projects = await primsaClient.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
    const safeProjects = projects.map((project) => ({
      ...project,
      createdAt: project.createdAt.toISOString(),
      user: {
        ...project.user,
        createdAt: project.user.createdAt.toISOString(),
        emailVerified: project.user.emailVerified?.toISOString(),
        updatedAt: project.user.updatedAt.toISOString(),
      },
    }));
    return safeProjects;
  } catch (error) {
    return error;
  }
};
