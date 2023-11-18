"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showGrid, setShowGrid] = useState(false);
  const generateGridItems = () => {
    const items = [];
    for (let i = 0; i < 9; i++) {
      items.push(
        <div className="flex justify-center items-center" key={i}>
          <div className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] bg-black rounded-full"></div>
        </div>
      );
    }
    return items;
  };
  return (
    <main className="flex min-h-screen flex-col items-start p-5 container mx-auto">
      <div className="md:grid md:grid-cols-2 md:justify-between mb-5 w-full ">
        <div className="space-y-2 md:space-y-4">
          <div className="flex flex-col">
            <span>Pseudo: </span>
            <span>Oloni</span>
          </div>
          <div className="flex flex-col">
            <span>Meilleure score: </span>
            <span>12000</span>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <label
              htmlFor="level"
              className="block mb-2 text-sm font-medium text-black dark:text-black"
            >
              Niveau de difficulté :
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full h-8 p-2 flex justify-center items-center"
            >
              <option value="easy" selected>
                Facile
              </option>
              <option value="Normal">Normal</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>
          <div>
            <span>Durée de visibilité (en second):</span>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full h-8 p-2 flex justify-center items-center my-1"
            />
          </div>
        </div>
      </div>
      {showGrid ? (
        <div className="flex-1 grid grid-cols-3 gap-4 w-full border-2 border-gray-5 rounded-lg p-5">
          {generateGridItems()}
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center w-full border-2 border-gray-5">
          <Image
            src="/375-removebg-preview.png"
            alt="play image"
            className="cursor-pointer"
            onClick={() => setShowGrid(true)}
            width={100}
            height={100}
          />
        </div>
      )}
    </main>
  );
}
