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
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);
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

  const deleteRecipe = async (id: number) => {
    const { error } = await supabase.from("recipes").delete().eq("id", id);
    if (!error) {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } else {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <div className="space-x-4">
          <a
            href="/ai/generate"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition font-medium cursor-pointer"
          >
            Generate
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-grow p-6">
        {userEmail ? (
          <>
            {/* Welcome Section */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
              AI-Powered Recipe Generator
            </h1>
            <h2 className="text-xl text-center text-gray-700 font-semibold mb-2">
              Welcome, {userName ?? userEmail}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-4">
              Discover recipes crafted by artificial intelligence! Just tell us
              your ingredients and dietary needs, and we’ll generate delicious, unique meals just for you.
            </p>

            {/* CTA Button */}
            <div className="text-center mt-4">
              <a
                href="/ai/generate"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition font-medium"
              >
                Generate a Recipe
              </a>
            </div>

            {/* Saved Recipes */}
            <h3 className="text-lg font-bold text-gray-800 mt-10 mb-4">
              Saved Recipes
            </h3>

            {recipes.length > 0 ? (
              <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white border rounded-xl p-4 shadow-md relative"
                  >
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {recipe.title}
                    </h2>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {recipe.recipe_text || "No recipe provided"}
                    </p>
                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      title="Delete Recipe"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center mt-6">
                No saved recipes yet. Let’s generate one!
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-700 text-center">Loading...</p>
        )}
      </div>
    </main>
  );
}
