// Loader component
import React from "react";

interface LoadingScreenProps {
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ className }) => {
  return (
    <div
      className={`fixed top-auto left-auto w-full h-full bg-background-color flex justify-center items-center ${className}`}
    >
      <div className="loader">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
