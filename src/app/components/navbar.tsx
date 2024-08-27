// Import necessary dependencies
import React, { useState, useEffect } from "react";

export default function Navbar() {
  // State variable to track the dark mode state.
  const [darkMode, setDarkMode] = useState(false);

  // Effect hook to detect the user's preferred color scheme and set the dark mode state accordingly.
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);
  }, []);

  // Function to handle the toggle button click event.
  // Toggles the dark mode state and updates the document's class list accordingly.
  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Render the navbar component
  return (
    <div className="flex justify-between items-baseline p-4 bg-secondary z-20 relative">
      <h1 className="text-xl font-bold">Navbar</h1>
      <div>
        <div className="relative inline-block w-24 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            id="theme-toggle"
            className="hidden"
            checked={darkMode}
            onChange={handleToggle}
          />
          <label
            htmlFor="theme-toggle"
            className={`flex items-center w-24 h-10 rounded-full cursor-pointer ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-8 h-8 rounded-full transition duration-200 ease-in ${
                darkMode
                  ? "bg-white transform translate-x-[3.75rem]"
                  : "bg-blue-950 transform -translate-x-[-0.25rem]"
              }`}
            />
            <span
              className={`text-sm font-bold transition-transform duration-1000 ease-in-out flex-1 ${
                darkMode ? "text-left ml-2" : "text-right mr-2"
              }`}
            >
              {darkMode ? "Dark" : "Light"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
