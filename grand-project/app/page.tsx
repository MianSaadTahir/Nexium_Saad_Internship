"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!error && data.user) {
        setUserEmail(data.user.email ?? null);

        // Get the name from localStorage
        const storedName = localStorage.getItem("userName");
        if (storedName) {
          setUserName(storedName);
        }
      } else {
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-white">
      <div className="text-center space-y-4">
        {userEmail ? (
          <>
            <h1 className="text-2xl font-bold text-black">
              Welcome, {userName ?? userEmail}
            </h1>
            <a
              href="/ai/generate"
              className="inline-block mt-4 bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600"
            >
              Generate a Recipe
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-black px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-black">Checking authentication...</p>
        )}
      </div>
    </main>
  );
}
