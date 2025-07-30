"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!userEmail) return;

      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_email", userEmail);

      if (!error && data) {
        setRecipes(data);
      }
    };

    fetchRecipes();
  }, [userEmail]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b bg-gray-100">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <div className="space-x-4">
          <a
            href="/ai/generate"
            className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Generate
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-black px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          {userEmail ? (
            <>
              <h1 className="text-2xl font-bold text-black">
                Welcome, {userName ?? userEmail}
              </h1>

              {recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="border rounded-md p-4 shadow-md bg-white text-left"
                    >
                      <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
                      <p className="text-sm text-gray-700">
                        {recipe.recipe_text || "No recipe provided"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 mt-6 italic">
                  No saved recipes yet. Let’s generate one!
                </p>
              )}
            </>
          ) : (
            <p className="text-black">Checking authentication...</p>
          )}
        </div>
      </div>
    </main>
  );
}
