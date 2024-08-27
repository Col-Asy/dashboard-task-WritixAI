"use client";

// Import components from local files
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import LoadingScreen from "./components/loading";

// Import React hooks
import { useState, useEffect } from "react";

export default function Home() {
  // State variable to track whether the loading screen should be displayed
  const [loading, setLoading] = useState(true);

  // Effect hook to set the loading state to false after the component has mounted
  useEffect(() => {
    // Set loading to false after a short delay to allow the loading screen to be displayed briefly
    setLoading(false);
  }, []);

  // Render the home page component
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="h-full">
          <Navbar />

          <div className="h-[calc(100vh-4rem)]">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
