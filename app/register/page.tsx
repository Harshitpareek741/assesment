"use client";
import React, { useState, FormEvent } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function isStrongPassword(password: string): boolean {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return strongPasswordRegex.test(password);
}

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!isStrongPassword(data.password)) {
      setError("Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.");
      toast.error("Password is too weak!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register user.");
      }

      setSuccess("User registered successfully!");
      toast.success("User registered successfully!");
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("Registration failed!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen w-screen flex bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-500 bg-opacity-25 mb-10 p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Register</h2>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-white">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <ToastContainer />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-950 hover:bg-green-950 text-white p-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Register"}
        </button>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {success && <p className="text-sm text-green-500 text-center">{success}</p>}
      </form>
    </div>
  );
}
