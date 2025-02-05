import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const username = body.username;
  const password = body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    //we can redirect instead of sending messages
    return NextResponse.json({
      message: "User signed up successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Signup failed",
    });
  }
}
