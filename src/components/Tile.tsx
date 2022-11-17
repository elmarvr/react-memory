import { useActor } from "@xstate/react";
import { match } from "../utils/match";
import { TileActor } from "../machines/tile";

interface TileProps {
  actor: TileActor;
}

const Tile = ({ actor }: TileProps) => {
  const [state, send] = useActor(actor);

  const stateClassName = match(state, {
    default: () => "bg-slate-700",
    wrong: () => "bg-slate-800",
    active: () => "bg-slate-500",
  });

  return (
    <button
      disabled={state.matches("wrong") || state.matches("active")}
      onClick={() => send("CLICK")}
      className={`rounded aspect-square [&:not(:disabled)]:hover:bg-gray-500 ${stateClassName}`}
    />
  );
};

export default Tile;
