import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const content = body.content;
  const username = req.headers.get("username");

  if (username == null) {
    return NextResponse.json({
      message: "username not defined",
    });
  }
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (user == null) {
    return NextResponse.json({
      message: "invalid username",
    });
  }

  await prisma.diaryContent.create({
    data: {
      Content: content,
      userId: user.id,
    },
  });

  return NextResponse.json({
    message: "Content added successfully",
  });
}
