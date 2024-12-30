import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"



export async function middleware(req: NextRequest) {
  //im not storing token with Bearer is the begginning
  const token = req.headers.get("token");

  if (!token) {
    return NextResponse.json({
      message: "not authorized user",
    });
  }
  if (process.env.JWT_SECRET) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload} = await jose.jwtVerify(token, secret);


      if (payload.username == undefined) {
        return NextResponse.json({
          message: "Invalid token",
        });
      }
      // const newHeaders = new Headers(req.headers)
      // newHeaders.set("username",payload.username as string)
      // console.log(newHeaders)
      const newHeaders = new Headers(req.headers);
      newHeaders.set("username", payload.username as string);
      return NextResponse.next({
        request: {
          headers: newHeaders
        }
      });

  }
}
  export const config = {
    matcher: "/api/v1/diary/create",
  };
