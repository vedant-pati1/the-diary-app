"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setIsLogged(localStorage.getItem("token") !== null);
  }, []);
  function clear() {
    localStorage.removeItem("token");
    setIsLogged(false);
    router.push("/");
    //need to do state management so that isLogged can be made tracked properly
  }
  if (!isLogged) {
    return (
      <>
        <nav className="flex justify-between py-3 bg-black">
          <Link
            href={"/diary"}
            className=" p-1 px-2 bg-indigo-900 text-white rounded-sm"
          >
            My Diary
          </Link>
          <div className="p-1">
            <Link
              className="mx-1 p-[6px] px-2 bg-indigo-900 text-white rounded-sm"
              href={"/signup"}
            >
              Signup
            </Link>
            <Link
              className="mx-1 p-[6px] px-2 bg-indigo-900 text-white rounded-sm"
              href={"/signin"}
            >
              Login
            </Link>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="flex justify-between py-3 bg-black">
          <Link
            href={"/diary"}
            className=" p-1 px-2 bg-indigo-900 text-white rounded-sm"
          >
            My Diary
          </Link>
          <button
            onClick={clear}
            className="mx-1 p-1 px-2 bg-indigo-900 text-white rounded-sm"
          >
            Logout
          </button>
        </nav>
      </>
    );
  }
}
