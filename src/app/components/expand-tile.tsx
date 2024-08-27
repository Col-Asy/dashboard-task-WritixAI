// Expanded Tile component
"use client";
import React from "react";
import Image from "next/image";

interface ExpandTileProps {
  className: string;
  data: any;
  onClose: any;
}

const ExpandTile: React.FC<ExpandTileProps> = ({
  className,
  data,
  onClose,
}) => {
  return (
    <>
      <div
        className={`flex w-full h-full justify-center items-center z-[100] ${className}`}
      >
        <div className="absolute top-auto space-y-4 w-full max-w-[500px] bg-highlight h-fit md:max-h-[90%]  flex flex-col   sm:rounded-3xl overflow-hidden p-5 shadow-lg">
          <div
            className="absolute cursor-pointer top-5 right-5 flex lg:hidden items-center justify-center   rounded-full h-6 w-6"
            onClick={() => onClose(null)}
          >
            <Image
              src="/close.svg"
              width={25}
              height={25}
              alt="Close icon"
              className="cursor-pointer svg-color"
            />
          </div>
          <div className="flex justify-center mb-4 p-5">
            <Image
              src={data.image}
              alt={data.name}
              width={200}
              height={200}
              className="rounded-md object-cover w-full h-64 md:h-80 lg:h-96"
            />
          </div>
          <div className="p-4 rounded-t-lg">
            <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
          </div>
          <div className="p-4">
            <p className="text-lg mb-2">Origin: {data.origin}</p>
            <p className="text-lg mb-2">Description: {data.description}</p>
            <p className="text-lg mb-2">Size: {data.size}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpandTile;
