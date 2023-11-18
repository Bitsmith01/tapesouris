"use client";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";

export default function Home() {
  const [showGrid, setShowGrid] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("Facile");
  const [selectedLevel, setSelectedLevel] = useState("Facile");
  const [visibilityDuration, setVisibilityDuration] = useState<number>(0);
  const [inputVisibilityDuration, setInputVisibilityDuration] = useState(0);
  const [error, setError] = useState<string>("");
  const [pointPositions, setPointPositions] = useState<
    { row: number; col: number }[]
  >([]);
  const [continueDialog, setContinueDialog] = useState(false);

  useEffect(() => {
    if (score >= 15) {
      setContinueDialog(true);
    }
  }, [score]);

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = event.target.value;
    setSelectedLevel(selectedLevel);
    setLevel(selectedLevel);
  };

  const handleVisibilityDurationChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const duration = parseInt(event.target.value, 10);
    setInputVisibilityDuration(duration);
    setVisibilityDuration(duration);
    setError("");
  };

  const handlestart = () => {
    if (visibilityDuration !== 0) {
      setShowGrid(true);
      setContinueDialog(false);
      console.log(level);
      console.log(visibilityDuration);
      startGame();
    } else {
      setError("La durée d'affichage doit être différente de zéro !!!");
    }
  };

  const startGame = () => {
    const pointCount = getPointCountForLevel(level);
    setPointPositions(generateRandomPositions(pointCount));

    setTimeout(() => {
      setPointPositions([]);
      setTimeout(() => {
        if (score < 15) {
          startGame();
        } else {
          setContinueDialog(true);
        }
      }, 2000);
    }, visibilityDuration * 1000);
  };

  const getPointCountForLevel = (selectedLevel: string): number => {
    switch (selectedLevel) {
      case "Facile":
        return 1;
      case "Normal":
        return 2;
      case "Difficile":
        return 3;
      default:
        return 1;
    }
  };

  const handleContinueClick = () => {
    setScore(0);
    setPointPositions([]);
    setContinueDialog(false);
    startGame();
  };

  const generateRandomPositions = (
    count: number
  ): { row: number; col: number }[] => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const row = Math.floor(Math.random() * 3);
      const col = Math.floor(Math.random() * 3);
      positions.push({ row, col });
    }
    return positions;
  };

  const generateGridItems = () => {
    const items = [];
    for (let i = 0; i < 9; i++) {
      const isCurrentPosition =
        pointPositions.length > 0 &&
        pointPositions.some(
          (position) =>
            position.row === Math.floor(i / 3) && position.col === i % 3
        );

      items.push(
        <div className="flex justify-center items-center" key={i}>
          <div className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] bg-gray-50 border-2 border-gray-900 rounded-full">
            {isCurrentPosition ? (
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/mouse.png"
                  alt="Image pour la position actuelle"
                  className="w-full h-full object-cover"
                  layout="fill"
                />
              </div>
            ) : null}
          </div>
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
            <span className="text-sm">Pseudo: </span>
            <span className="text-sm">Oloni</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Score actuel: </span>
            <span className="text-sm">{score}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <label
              htmlFor="level"
              className="block mb-2 text-sm text-black dark:text-black"
            >
              Niveau de difficulté :
            </label>
            <select
              id="countries"
              value={selectedLevel}
              onChange={handleLevelChange}
              disabled={showGrid}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full h-8 p-2 flex justify-center items-center"
            >
              <option value="Facile">Facile</option>
              <option value="Normal">Normal</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>
          <div>
            <span className="text-sm">Durée de visibilité (en secondes):</span>{" "}
            <input
              type="number"
              pattern="[0-9]*"
              value={visibilityDuration}
              onChange={handleVisibilityDurationChange}
              disabled={showGrid}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full h-8 p-1 flex justify-center items-center my-1"
            />
            <span>
              {" "}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </span>
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
            onClick={handlestart}
            width={100}
            height={100}
          />
        </div>
      )}
      {continueDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-5 rounded-lg">
            <p>Félicitations! Vous avez atteint 15 points.</p>
            <p>Voulez-vous continuer?</p>
            <button onClick={handleContinueClick}>Continuer</button>
            <button onClick={() => setShowGrid(false)}>Arrêter</button>
          </div>
        </div>
      )}
    </main>
  );
}
