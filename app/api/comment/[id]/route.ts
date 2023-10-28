import { getCurrentUser } from "@/app/actions/getCurrentUser";
import primsaClient from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser();
    const { id } = params;
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!id || typeof id !== "string") {
      return NextResponse.json({ message: "Invalid Id" }, { status: 403 });
    }
    await primsaClient.comment.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "Comment Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error();
  }
};
