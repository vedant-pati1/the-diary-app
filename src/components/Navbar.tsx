"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const router = useRouter()
  useEffect(() => {
    setIsLogged(localStorage.getItem("token") !== null);
  }, []);
  function clear() {
    localStorage.removeItem("token");
    setIsLogged(false);
    router.push("/")
    //need to do state management so that isLogged can be made tracked properly
  }
  if (!isLogged) {
    return (
      <>
        <nav className="flex justify-between">
          <Link href={"/diary"}>My Diary</Link>
          <div>
            <Link className="m-2" href={"/signup"}>
              Signup
            </Link>
            <Link className="m-2" href={"/signin"}>
              Login
            </Link>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="flex justify-between">
          <Link href={"/diary"}>My Diary</Link>
          <button onClick={clear}>Logout</button>
        </nav>
      </>
    );
  }
}
