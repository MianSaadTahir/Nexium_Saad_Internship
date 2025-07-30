"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { saveRecipe } from "@/api/supabase/saveRecipe";

export default function GeneratePage() {
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [prefSavedMessage, setPrefSavedMessage] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecipe(null);
    setSavedMessage("");
    setPrefSavedMessage("");

    try {
      const res = await fetch(
        "https://saadtahirproton.app.n8n.cloud/webhook/generate-recipe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients, diet }),
        }
      );

      const data = await res.json();
      const output = data.output || "No recipe generated.";
      setRecipe(output);
    } catch (err) {
      console.error("Error generating recipe:", err);
      setRecipe("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!recipe) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const storedName = localStorage.getItem("userName") || "";

      if (user?.email) {
        await saveRecipe(user.email, storedName, recipe);
        setSavedMessage("✅ Recipe saved to Supabase.");
      } else {
        setSavedMessage("⚠️ You must be logged in to save.");
      }
    } catch (err) {
      console.error("Error saving recipe:", err);
      setSavedMessage("❌ Failed to save recipe.");
    }
  };

  const handleSavePreferences = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userEmail = user?.email || "";
      const userName = localStorage.getItem("userName") || "";

      const res = await fetch("/api/saveInput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, diet, userEmail, userName }),
      });

      const data = await res.json();

      if (res.ok) {
        setPrefSavedMessage("✅ Preferences saved to MongoDB.");
      } else {
        setPrefSavedMessage(data.error || "❌ Failed to save preferences.");
      }
    } catch (err) {
      console.error("Failed to save preferences:", err);
      setPrefSavedMessage("❌ Failed to save preferences.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">AI Recipe Generator</h1>
        <div className="space-x-4">
          <a
            href="/"
            className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Dashboard
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
      <section className="flex-grow flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-black">
            Generate a Recipe
          </h2>

          <label className="block text-sm font-medium text-black">
            Ingredients (comma separated):
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className="w-full border rounded-md p-2 h-24 resize-none text-black"
            placeholder="e.g. chicken, tomato, garlic"
          />

          <label className="block text-sm font-medium text-black">
            Dietary Preference (optional):
          </label>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full border rounded-md p-2 text-black"
          >
            <option value="">None</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="keto">Keto</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-black py-2 rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Generating..." : "Generate Recipe"}
          </button>

          {/* Output and Buttons */}
          {recipe && (
            <>
              <div className="mt-4 p-4 border rounded-md bg-gray-50 whitespace-pre-wrap text-black">
                <pre className="whitespace-pre-wrap break-words">{recipe}</pre>
              </div>

              <button
                onClick={handleSave}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save Recipe
              </button>

              <button
                type="button"
                onClick={handleSavePreferences}
                className="mt-2 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
                Save Preferences
              </button>
            </>
          )}

          {/* Status Messages */}
          {(savedMessage || prefSavedMessage) && (
            <div className="space-y-2 pt-2 text-center text-sm">
              {savedMessage && (
                <p className="text-blue-600 font-medium">{savedMessage}</p>
              )}
              {prefSavedMessage && (
                <p className="text-purple-700 font-medium">{prefSavedMessage}</p>
              )}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
