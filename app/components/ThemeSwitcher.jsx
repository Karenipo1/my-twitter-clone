"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("dark");

  // On component mount, check for stored theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.body.dataset.theme = storedTheme;
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-xl border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg))]/80 transition-colors">
      <span className=" text-xs font-semibold -translate-x-1">Mode </span>
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex h-3.5 w-7 items-center rounded-full
          transition-colors duration-300
          ${theme === "dark" ? "bg-gray-700" : "bg-blue-500"}
        `}
      >
        <span
          className={`
            inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-300
            ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}
