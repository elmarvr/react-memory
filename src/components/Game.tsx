import { useSelector } from "@xstate/react";
import Tile from "./Tile";

import GameRoute from "./GameRoute";
import { useGameService } from "./GlobalStateProvider";
import { HiHeart } from "react-icons/hi";
import Button from "./Button";

const Game = () => {
  return (
    <div className="grid place-items-center min-h-screen text-white">
      <GameRoute matches="beforeStart" element={<BeforeStart />} />
      <GameRoute matches="beforeRestart" element={<BeforeRestart />} />
      <GameRoute matches="countdown" element={<Countdown />} />
      <GameRoute matches="board" element={<Board />} />
    </div>
  );
};

const BeforeStart = () => {
  const { send } = useGameService();

  return <Button onClick={() => send("START")}>Start</Button>;
};

const BeforeRestart = () => {
  const gameService = useGameService();
  const { send } = gameService;

  const level = useSelector(gameService, (state) => state.context.level);

  return (
    <div className="grid place-items-center text-medium text-xl">
      <p className="pb-16">You reached level {level} </p>

      <Button onClick={() => send("START")}>Restart</Button>
    </div>
  );
};

const Countdown = () => {
  const gameService = useGameService();

  const count = useSelector(gameService, (state) => state.context.count);

  return <p className="text-4xl text-medium">{count}</p>;
};

const Board = () => {
  const gameService = useGameService();

  const tiles = useSelector(gameService, (state) => state.context.tiles);
  const size = useSelector(gameService, (state) => state.context.size);
  const lives = useSelector(gameService, (state) => state.context.lives);
  const level = useSelector(gameService, (state) => state.context.level);

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <p className="text-xl">Level {level}</p>

        <div className="flex gap-2">
          {Array.from({ length: lives }, (_, i) => (
            <HiHeart size={32} key={i} />
          ))}
        </div>
      </div>

      <div className={`grid grid-cols-${size} gap-4 w-[440px]`}>
        {tiles.map((tile) => (
          <Tile actor={tile} />
        ))}
      </div>
    </div>
  );
};

export default Game;
