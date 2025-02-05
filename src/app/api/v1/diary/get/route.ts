import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const bodyDate = new Date(body.date);
  console.log(bodyDate);
  const username = req.headers.get("username");

  if (username == null) {
    return NextResponse.json({
      message: "username not defined",
    });
  }
  console.log("how you doin");
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        //add a raw query to get diary entries on the basis of date
        diary: true,
      },
    });

    console.log("how you doin");
    if (user) {
      let filteredDiary = user.diary.map((diary) => {
        //bad way to do it use a SQL query above instead
        if (
          diary.Date.getDay() === bodyDate.getDay() &&
          diary.Date.getMonth() === bodyDate.getMonth() &&
          diary.Date.getFullYear() === bodyDate.getFullYear()
        ) {
          return diary.Content;
        } else {
          return undefined;
        }
      });
      filteredDiary = filteredDiary.filter((content) => content !== undefined);
      return NextResponse.json({
        content: filteredDiary,
      });
    } else {
      return NextResponse.json({
        message: "user not found",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "problem with the database",
    });
  }
}
