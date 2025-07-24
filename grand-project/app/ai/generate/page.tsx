'use client'

import React, { useState } from 'react'

export default function GeneratePage() {
    const [ingredients, setIngredients] = useState('')
    const [diet, setDiet] = useState('')
    const [loading, setLoading] = useState(false)
    const [recipe, setRecipe] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setRecipe(null)

        try {
            const res = await fetch('https://saadtahirproton.app.n8n.cloud/webhook/generate-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients, diet }),
            })

            const data = await res.json()
            setRecipe(data.output || 'No recipe generated')
        } catch (err) {
            console.error('Error generating recipe:', err)
            setRecipe('Something went wrong. Please try again.')
        }

        setLoading(false)
    }


    return (
        <main className="min-h-screen p-4 flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full space-y-4"
            >
                <h1 className="text-2xl font-bold text-center text-black">AI Recipe Generator</h1>

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

                <label className="block text-sm font-medium text-black">Dietary Preference (optional):</label>
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
                    {loading ? 'Generating...' : 'Generate Recipe'}
                </button>

                {recipe && (
                    <div className="mt-4 p-4 border rounded-md bg-gray-50 whitespace-pre-wrap text-black">
                        {recipe}
                    </div>
                )}
            </form>
        </main>
    )
}
