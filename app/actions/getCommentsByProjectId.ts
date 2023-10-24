import primsaClient from "../utils/prismaClient";

interface IParams {
  id: string;
}

export const getCommentsByProjectId = async (params: IParams) => {
  const { id } = params;
  try {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid Id");
    }
    const comments = await primsaClient.comment.findMany({
      where: {
        projectId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        User: true,
      },
    });
    const safeComments = comments.map((comment) => ({
      ...comment,
      updatedAt: comment.updatedAt.toISOString(),
      createdAt: comment.updatedAt.toISOString(),
      User: {
        ...comment.User,
        createdAt: comment.User.createdAt.toISOString(),
        updatedAt: comment.User.updatedAt.toISOString(),
        emailVerified: comment.User.emailVerified?.toISOString(),
      },
    }));
    return safeComments;
  } catch (error) {
    return error;
  }
};
