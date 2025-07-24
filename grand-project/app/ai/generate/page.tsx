"use client";

import React, { useState } from "react";
import { saveRecipe } from "@/api/supabase/saveRecipe";
import { supabase } from "@/lib/supabase";

export default function GeneratePage() {
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [prefSavedMessage, setPrefSavedMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecipe(null);

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
      const output = data.output || "No recipe generated";
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
        setSavedMessage("Recipe saved to Supabase");
      } else {
        setSavedMessage("You must be logged in to save.");
      }
    } catch (err) {
      console.error("Error saving recipe:", err);
      setSavedMessage("Failed to save recipe.");
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
        setPrefSavedMessage("Preferences saved to MongoDB");
      } else {
        setPrefSavedMessage(data.error || "Failed to save preferences.");
      }
    } catch (err) {
      console.error("Failed to save preferences:", err);
      setPrefSavedMessage("Failed to save preferences.");
    }
  };

  return (
    <main className="min-h-screen p-4 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-black">
          AI Recipe Generator
        </h1>

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
          className="w-full bg-green-600 text-black py-2 rounded-md hover:bg-green-700"
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
        {recipe && (
          <>
            <div className="mt-4 p-4 border rounded-md bg-gray-50 whitespace-pre-wrap text-black">
              <pre className="whitespace-pre-wrap break-words">{recipe}</pre>
            </div>
            <button
              onClick={handleSave}
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Save Recipe
            </button>

            {savedMessage && (
              <p className="text-green-600 text-center mt-2">{savedMessage}</p>
            )}
            <button
              type="button"
              onClick={handleSavePreferences}
              className="mt-2 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Save Preferences
            </button>

            {prefSavedMessage && (
              <p className="text-purple-700 text-center mt-2">
                {prefSavedMessage}
              </p>
            )}
          </>
        )}
      </form>
    </main>
  );
}
