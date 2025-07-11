// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="fixed bottom-5 right-5 z-50 px-4 py-2 bg-secondary text-white rounded-full shadow-md hover:bg-sidebar-ring/70 transition"
        >
            {theme === "dark" ? "🌞" : "🌙"}
        </button>
    );
}
