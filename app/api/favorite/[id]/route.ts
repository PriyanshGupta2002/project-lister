import { getCurrentUser } from "@/app/actions/getCurrentUser";
import primsaClient from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({
        message: "Login to like projects",
        status: 401,
      });
    }
    if (currentUser?.favoriteProjects.includes(id)) {
      const favoriteId = currentUser.favoriteProjects.filter(
        (projectId) => projectId !== id
      );
      await primsaClient.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          favoriteProjects: favoriteId,
        },
      });
      return NextResponse.json({ message: "Removed from Favorites" });
    }
    await primsaClient.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        favoriteProjects: {
          push: id,
        },
      },
    });
    return NextResponse.json({ message: "Added To Favorites" });
  } catch (error) {
    return NextResponse.error();
  }
};
