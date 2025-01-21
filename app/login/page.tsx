"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const api: string = "http://localhost:3000/api/auth/login";
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email or password are required");
      return;
    }

    try {
      const response = await axios.post<{ token: string }>(api, { email, password });
      const token = response.data.token;

      if (!token) {
        alert("Server error");
        return;
      }

      localStorage.setItem("token", token);
      alert("User logged in");
      router.push("/dashboard"); // Redirect to the dashboard after login
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen h-screen w-screen flex bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-500 bg-opacity-25 mb-10 p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-950 hover:bg-green-950 text-white p-2 rounded transition"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-white">
            Not signed in?{" "}
            <a
              href="/register"
              className="text-blue-300 hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
