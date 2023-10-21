import primsaClient from "@/app/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (request: NextRequest) => {
  try {
    const { email, password, name } = await request.json();
    const doesUserExist = await primsaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (doesUserExist) {
      return NextResponse.json(
        { message: "User already registered" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await primsaClient.user.create({
      data: {
        hashedPassword,
        name,
        email,
      },
    });
    return NextResponse.json(
      { message: "Congratulations! You have successfully registered", user },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.error();
  }
};
