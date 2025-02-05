"use client";
import { useRef, useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function Page() {
  const [content, setContent] = useState<string>("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [diaryPreviews, setDiaryPreviews] = useState<string[]>(["hh"]);
  const [token, setToken] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //need to do this shit cause nextjs sucks
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  useEffect(() => {
    if (token) {
      async function fetchData() {
        console.log(token);
        console.log(date);
        const res = await fetch("/api/v1/diary/get", {
          method: "POST",
          headers: {
            token: token as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date,
          }),
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (data) {
          setDiaryPreviews(data.content);
        } else {
          setDiaryPreviews(["No previous entries present"]);
        }
        setLoading(false);
      }
      fetchData();
    }
    // fetch('/api/v1/diary/get', {
    //   method: "POST"
    // })
    //   .then(res => res.json())
    //   .then((data) => {
    //     if (data) {
    //       setDiaryPreviews(data.content)
    //     } else {
    //       setDiaryPreviews(["No previous entries present"])
    //     }
    //   }
    //   )
    console.log(diaryPreviews);
  }, [date, token]);

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

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="bg-blue-500 h-[calc(100vh-56px)] flex justify-between">
        <div className="bg-slate-300 w-[300px] h-[80%] ml-4 mt-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              if (date) {
                setDate(date);
              }
            }}
            className="rounded-md border"
          />
          <div>{date?.toLocaleString()}</div>
          <div>
            {diaryPreviews.map((value, index) => (
              <div key={index}>{value.substring(0, 10)}</div>
            ))}
          </div>
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
