"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "../context/usercontext";
import jwt from 'jsonwebtoken';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email or password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const token = response.data.token;

      if (!token) {
        toast.error("Server error");
        return;
      }

      localStorage.setItem("token", token);

      const decodedToken = jwt.decode(token);
      if (decodedToken && typeof decodedToken !== "string") {
        setUser({ id: decodedToken.id, email: decodedToken.email });
      }

      toast.success("User logged in");
      router.push("/dashboard");
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
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
          disabled={loading}
          className={`w-full ${loading ? "bg-gray-400" : "bg-blue-950 hover:bg-green-950"} text-white p-2 rounded transition`}
        >
          {loading ? "Logging in..." : "Login"}
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
      <ToastContainer />
    </div>
  );
}
