import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen  bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col justify-center items-center  gap-3">
       <div className="text-4xl font-mono font-extrabold text-white">Welcome To</div>
       <div className="text-4xl font-mono font-extrabold text-white text-center">Task Manager - Set Your Daily Task</div>
       <Link href="/login" className="text-xl bg-blue-950 p-2 rounded-xl font-mono font-extrabold text-yellow-100 text-center hover:text-green-300">
          Get Started
        </Link>
    </div>
   
  );
}
