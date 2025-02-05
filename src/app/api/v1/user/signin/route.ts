import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const username = body.username;
  const password = body.password;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      if (!process.env.JWT_SECRET) {
        return NextResponse.json({
          message: "issue with JWT_SECRET",
        });
      } else {
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        return NextResponse.json({
          token,
        });
      }
    } else {
      return NextResponse.json({
        message: "invalid password",
      });
    }
  } else {
    return NextResponse.json({
      message: "invalid username",
    });
  }
}
