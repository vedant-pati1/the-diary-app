"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  async function Submit() {
    const backend = `/api/v1/user/signin`;
    console.log(username);
    console.log(password);

    const response = await fetch(backend, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    if (data.token) {
      console.log("Helow")
      localStorage.setItem("token", data.token);
      console.log("Helow")
      router.push("/diary")

    } else {
      console.log("token not present");
    }
    if (data.message) {
      console.log(data.message);
    }
  }

  return (
    <div className="h-screen bg-blue-500 flex items-center justify-center ">
      <div className="bg-white w-[400px] h-[400px] rounded-2xl flex flex-col  strok justify-between py-16 px-10 shadow-2xl">
        <div>
          <h1 className="text-3xl">Login Page</h1>
          <p className="mt-2 text-white">
            we are excitated to welcome you to our family. hope you journal
            everyday and maintain that streak of yours
          </p>
        </div>
        {/* Username */}
        <div className="flex">
          <label className="mx-2" htmlFor="username">
            {" "}
            Username
          </label>
          <input
            value={username}
            className="border-2 rounded-sm"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        </div>
        {/* Password */}
        <div className="flex">
          <label className="mx-2" htmlFor="password">
            {" "}
            Password
          </label>
          <input
            value={password}
            className="border-2 rounded-sm"
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          ></input>
        </div>
        <button
          onClick={Submit}
          className="bg-blue-500 text-white w-20 self-center"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
