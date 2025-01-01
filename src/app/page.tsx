"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLogged(true);

      //later on add logic of going to /diary only for the first time
      //when it link is click then onwards / should exist as a separate page.

      router.push("/diary");
    }
  }, []);

  return <div>Home page</div>;
}
