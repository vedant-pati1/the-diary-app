"use client";
import { useRef, useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function Page() {
  const [content, setContent] = useState<string>("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    //need to do this shit cause nextjs sucks
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  if (!token) {
    return <div>You are unauthorized</div>;
  }

  function handler(e: EventHandler) {
    setContent(e.target.value);
  }
  async function onclick() {
    const backend = "api/v1/diary/create";
    const idk = await fetch(backend, {
      method: "POST",
      body: JSON.stringify({
        content: content,
      }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token") as string,
      },
    });
    const data = await idk.json();
    console.log(data);
    //temporary indicator of submisson completion
    if (textRef.current) {
      const ele = textRef.current;
      ele.classList.toggle("bg-slate-300", false);
      ele.classList.toggle("bg-green-500", true);
      setTimeout(() => {
        ele.classList.toggle("bg-green-300", false);
        ele.classList.toggle("bg-slate-300", true);
      }, 500);
    }
  }
  return (
    <>
      <div className="bg-blue-500 h-[calc(100vh-56px)] flex justify-between">
        <div className="bg-slate-300 w-[300px] h-[80%] ml-4 mt-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <div>{date?.toString()}</div>
        </div>
        <div className="flex-col w-[1100px] h-auto mr-2 mt-2">
          <textarea
            value={content}
            ref={textRef}
            className=" bg-slate-300 rounded-sm w-full h-[80%] p-2 shadow-xl "
            name="mainContent"
            onChange={handler}
          ></textarea>
          <div className="flex flex-row-reverse w-full bg-blue-600">
            <button className="m-2 mt-3 px-2 bg-black text-white rounded-sm w-16 h-8 shadow-lg">
              Edit
            </button>
            <button
              onClick={onclick}
              className="m-2  mt-3 px-2 bg-black text-white rounded-sm w-16 h-8 shadow-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
