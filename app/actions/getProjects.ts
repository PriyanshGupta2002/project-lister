import primsaClient from "../utils/prismaClient";
import { getCurrentUser } from "./getCurrentUser";

interface Iparams {
  favorite?: boolean;
  searchText?: string;
}
export const getProjects = async (params: Iparams) => {
  const currentUser = await getCurrentUser();
  let query: any = {};
  if (params?.favorite) {
    const filterOb = {
      in: currentUser?.favoriteProjects || [],
    };
    query.id = filterOb;
  }
  if (params.searchText) {
    const nameOb = {
      mode: "insensitive",
      contains: params.searchText,
    };
    query.projectTitle = nameOb;
  }
  try {
    const projects = await primsaClient.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: query,
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
