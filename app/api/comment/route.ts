import { getCurrentUser } from "@/app/actions/getCurrentUser";
import primsaClient from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { message, projectId } = await req.json();
    if (!message) {
      return NextResponse.json(
        { message: "Comment message is mandatory" },
        { status: 403 }
      );
    }
    if (!projectId || typeof projectId !== "string") {
      return NextResponse.json({ message: "Invalid Id" }, { status: 403 });
    }
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const newComment = await primsaClient.comment.create({
      data: {
        projectId,
        message,
        userId: currentUser.id,
      },
    });
    return NextResponse.json({ message: "Comment Added 🎉" }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
};
