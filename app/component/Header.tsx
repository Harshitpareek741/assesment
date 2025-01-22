"use client";

import Link from "next/link";
import { useUser } from "../context/usercontext";
import { useState } from "react";
import { useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
}

export const Header = () => {
  const { user } = useUser();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const router = useRouter();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  // const handleSignOut = async () => {
   
  //     localStorage.removeItem("token");
  //     await axios.post("/api/logout");
  //     router.push("/login");

  // };

  return (
    <div className="bg-slate-800 text-white w-full flex items-center justify-between px-6 py-4 shadow-md">
      <div className="text-2xl font-bold">
        <Link href="/" className="hover:text-slate-300">
          Task Manager
        </Link>
      </div>

      <div className="flex space-x-6 text-lg">
        <Link href="/" className="hover:text-slate-300">
          Home
        </Link>

       {
        currentUser ? 
        (<Link href="/login" className="hover:text-slate-300">
          Sign In
        </Link>) : ""
       } 

        {/* {currentUser ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
         
        )} */}
      </div>
    </div>
  );
};
