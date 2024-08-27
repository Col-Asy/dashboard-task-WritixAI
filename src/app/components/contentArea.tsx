// Import necessary dependencies
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import ExpandTile from "./expand-tile";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ContentAreaProps {
  data: any;
}

export default function ContentArea({ data }: ContentAreaProps) {
  // State variables
  const [expanded, setExpanded] = useState<true | null>(null);
  const [key, setKey] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Refs
  const expandTileRef = useRef<HTMLDivElement | null>(null);
  const blurOverlayRef = useRef<HTMLDivElement | null>(null);

  // Effect hook to handle expanded state
  useEffect(() => {
    if (expanded) {
      const scrollControl = () => {
        if (window.innerWidth >= 516) {
          setExpanded(null);
        }
      };

      const listener = (event: any) => {
        if (
          expandTileRef.current &&
          expandTileRef.current.contains(event.target)
        ) {
          return;
        }
        setExpanded(null);
      };
      window.addEventListener("scroll", scrollControl);
      window.addEventListener("touchstart", listener);
      window.addEventListener("mousedown", listener);
      return () => {
        window.removeEventListener("scroll", scrollControl);
        window.removeEventListener("touchstart", listener);
        window.removeEventListener("mousedown", listener);
      };
    }
  }, [expanded]);

  // Filter data based on search query and selected category
  const filteredData = data.filter((item: { origin: string; name: string }) => {
    return (
      (selectedCategory === "" || item.origin === selectedCategory) &&
      (searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Render the contentArea component
  return (
    <>
      <div className="flex-1 flex flex-col justify-around w-full p-4 rounded-2xl h-full">
        <div className="mb-4 flex justify-between items-baseline space-x-10">
          <span className="w-full md:w-1/3 h-fit">
            <input
              type="text"
              placeholder="search bar"
              className="p-2 rounded-md w-full md:w-auto h-10 md:h-12 text-base md:text-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
          </span>
          <span className="w-full md:w-1/5 h-fit">
            <select
              className="mt-2 p-2 border border-highlight rounded w-full md:w-auto h-10 md:h-12 text-base md:text-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Australia">Australia</option>
              <option value="Africa">Africa</option>
              <option value="Antarctica">Antarctica</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
            </select>
          </span>
        </div>
        <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredData.map(
            (
              item: {
                image: string | StaticImport;
                name: string;
                origin: string;
                description: string;
                size: string;
              },
              index: number
            ) => (
              <div
                className="p-4 bg-card rounded shadow  bg-secondary w-[70%] sm:w-full h-fit sm:h-40 flex flex-col items-center sm:items-start justify-around relative"
                key={index}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className={`sm:absolute sm:right-4 sm:top-1/2 sm:transform sm:-translate-y-1/2 w-24 h-24 rounded-md object-cover ${
                    window.innerWidth < 516 ? "block mb-4" : ""
                  }`}
                />
                <h3 className="font-semibold text-xl w-1/2 text-center sm:text-left">
                  {item.name}
                </h3>
                <button
                  className="mt-2 py-2 px-4 rounded bg-primary text-white hover:bg-secondary hover:text-black"
                  onClick={() => {
                    setExpanded(true), setKey(index);
                  }}
                >
                  Click here
                </button>
              </div>
            )
          )}
        </div>
        {expanded !== null &&
          createPortal(
            <div>
              <div
                className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <span ref={expandTileRef}>
                  <ExpandTile
                    data={filteredData[key]}
                    onClose={() => setExpanded(null)}
                    className={""}
                  />
                </span>
              </div>
              <div
                ref={blurOverlayRef}
                className="fixed top-0 left-0 w-full h-full   opacity-50 z-[49]"
              />
            </div>,
            document.body
          )}
      </div>
    </>
  );
}
