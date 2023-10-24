import primsaClient from "../utils/prismaClient";
import { getCurrentUser } from "./getCurrentUser";

interface IParams {
  id: string;
}

export const getProjectById = async (params: IParams) => {
  const { id } = params;
  if (!id || typeof id !== "string") {
    return null;
  }
  const projectDetail = await primsaClient.project.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        include: {
          Projects: true,
        },
      },
    },
  });
  return {
    ...projectDetail,
    createdAt: projectDetail?.createdAt.toISOString(),
    user: {
      ...projectDetail?.user,
      createdAt: projectDetail?.user.createdAt.toISOString(),
      updatedAt: projectDetail?.user.updatedAt.toISOString(),
      emailVerified: projectDetail?.user.emailVerified?.toISOString(),
    },
  };
};
