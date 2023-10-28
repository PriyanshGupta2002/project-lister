import { getCurrentUser } from "@/app/actions/getCurrentUser";
import primsaClient from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}
export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;
  const currentUser = await getCurrentUser();
  try {
    if (!id || typeof id !== "string") {
      return NextResponse.json({ message: "Inavldi Id" }, { status: 402 });
    }
    if (!currentUser) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }
    console.log(id);

    const data = await primsaClient.project.delete({
      where: {
        id,
      },
    });
    console.log(data);
    return NextResponse.json({ message: "Project Deleted Successfully" });
  } catch (error) {
    return NextResponse.error();
  }
};
