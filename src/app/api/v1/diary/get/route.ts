import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const body = await req.json();
  const bodyDate = new Date(body.date);
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
    include: {
      //add a raw query to get diary entries on the basis of date
      diary: true,
    },
  });
  console.log(user);
  if (user) {
    console.log(user.diary);
    console.log(typeof body.date);
    let filteredDiary = user.diary.map((diary) => {
      //bad way to do it use a SQL query above instead
      console.log(diary.Date.getDay());
      console.log(bodyDate.getDay());
      console.log(diary.Date.getMonth());
      console.log(bodyDate.getMonth());
      console.log(diary.Date.getFullYear());
      console.log(bodyDate.getFullYear());
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
    console.log(filteredDiary);
    filteredDiary = filteredDiary.filter((content) => content !== undefined);
    console.log(filteredDiary);
    return NextResponse.json({
      content: filteredDiary,
    });
  } else {
    return NextResponse.json({
      message: "user not found",
    });
  }
}
