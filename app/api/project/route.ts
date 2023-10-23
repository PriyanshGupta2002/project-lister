import { getCurrentUser } from "@/app/actions/getCurrentUser";
import primsaClient from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await req.json();
  const newProject = await primsaClient.project.create({
    data: {
      ...body,
      userId: currentUser.id,
    },
  });
  return NextResponse.json({
    newProject,
    message: "Project Added Successfully",
  });
};
