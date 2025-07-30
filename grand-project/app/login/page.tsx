// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    localStorage.setItem("userName", name);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-12">
      {/* Heading & Description */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI-Powered Recipe Generator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
         🧑‍🍳 Effortlessly create delicious meals with AI. <br></br> Just log in, tell us what ingredients you have and your dietary needs,<br></br> and let our AI chef cook up something special for you! 
        </p>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="card-hover-effect w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 ">Login</h2>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          {status === "loading" ? "Sending..." : "Send Magic Link"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-sm text-center">
            Check your email for the login link!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm text-center">
            Something went wrong. Try again.
          </p>
        )}
      </form>
    </main>
  );
}
