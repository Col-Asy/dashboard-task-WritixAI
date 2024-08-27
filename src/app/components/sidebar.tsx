// Import necessary dependencies
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContentArea from "./contentArea";
import data from "../../../data/dummyData.json";
import LoadingScreen from "./loading";

export default function Sidebar() {
  // State variables to track the active option, active data, sidebar open state, and mobile device detection
  const [activeOption, setActiveOption] = useState("dogs");
  const [activeData, setActiveData] = useState<any>(data.dogs);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to set the loading state to false after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // adjust the delay time as needed
    return () => clearTimeout(timer);
  }, [activeData, sidebarOpen]);

  // Effect hook to detect mobile devices and set the isMobile state
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", () => {
      setIsMobile(mediaQuery.matches);
    });
  }, []);

  // Effect hook to set the sidebar open state based on the window width
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarOpen(window.innerWidth > 768);
    }
  }, []);

  // Effect hook to add or remove the 'no-scroll' class from the body element based on the sidebar open state and mobile device detection
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sidebarOpen, isMobile]);

  // Function to handle option clicks
  const handleOptionClick = (option: string) => {
    setIsLoading(true); // Add this line
    setActiveOption(option);
    switch (option) {
      case "dogs":
        setActiveData(data.dogs);
        break;
      case "cats":
        setActiveData(data.cats);
        break;
      case "birds":
        setActiveData(data.birds);
        break;
      case "horses":
        setActiveData(data.horses);
        break;
      default:
        break;
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Function to toggle the sidebar open state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Render the sidebar component
  return (
    <div className="w-full flex space-x-5 md:h-full">
      {sidebarOpen ? (
        <div
          className={`absolute h-[calc(100vh-4rem)] w-full bg-secondary md:h-full md:w-1/2 z-20 lg:relative lg:w-1/4 flex flex-col justify-between p-5 pr-10`}
        >
          <div>
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-2xl">Sidebar</h2>
              <span onClick={toggleSidebar}>
                <Image
                  src="/close.svg"
                  width={25}
                  height={25}
                  alt="Close icon"
                  className="cursor-pointer svg-color"
                />
              </span>
            </div>
            <ul className="mt-5 p-2 flex flex-col space-y-5">
              <li
                className={`p-2 ${
                  activeOption === "dogs"
                    ? 'bg-active text-class-inverted rounded-md relative before:content-[">"]'
                    : "hover:bg-muted cursor-pointer"
                }`}
                onClick={() => handleOptionClick("dogs")}
              >
                Dogs
              </li>
              <li
                className={`p-2 ${
                  activeOption === "cats"
                    ? 'bg-active text-class-inverted rounded-md relative before:content-[">"]'
                    : "hover:bg-muted cursor-pointer"
                }`}
                onClick={() => handleOptionClick("cats")}
              >
                Cats
              </li>
              <li
                className={`p-2 ${
                  activeOption === "birds"
                    ? 'bg-active text-class-inverted rounded-md relative before:content-[">"] '
                    : "hover:bg-muted cursor-pointer"
                }`}
                onClick={() => handleOptionClick("birds")}
              >
               Birds
              </li>
              <li
                className={`p-2 ${
                  activeOption === "horses"
                    ? 'bg-active rounded-md relative before:content-[">"]'
                    : "hover:bg-muted cursor-pointer"
                }`}
                onClick={() => handleOptionClick("horses")}
              >
               Horses
              </li>
            </ul>
          </div>
          <div className="mt-4 p-2 border-highlight rounded-lg border">
            <div className="flex justify-between items-center">
              <span>Progress:</span>
              <span>{Math.round((71 / 100) * 100)}%</span>
            </div>
            <div className={`h-2 bg-secondary-text rounded-lg overflow-hidden`}>
              <div
                className="h-2 bg-active rounded-lg"
                style={{ width: `${(71 / 100) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-fit flex justify-center items-start p-5 bg-secondary`}
        >
          <Image
            src="/menu.svg"
            width={25}
            height={25}
            alt="Menu icon"
            onClick={toggleSidebar}
            className="cursor-pointer svg-color"
          />
        </div>
      )}
      {sidebarOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-opacity-50 z-10 lg:hidden`}
          style={{ marginLeft: "0px" }}
          onClick={toggleSidebar}
        />
      )}
      <div className="w-[80%] md:w-full h-fit lg:h-full">
        {isLoading ? (
          <LoadingScreen className="loading-screen" />
        ) : (
          <ContentArea data={activeData} />
        )}
      </div>
    </div>
  );
}
