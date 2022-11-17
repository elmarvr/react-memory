import { useSelector } from "@xstate/react";
import { ReactNode } from "react";
import { State, StateFrom } from "xstate";
import { gameMachine } from "../machines/game";
import { inferMatchesState } from "../utils/match";
import { useGameService } from "./GlobalStateProvider";

interface GameRouteProps {
  matches: inferMatchesState<StateFrom<typeof gameMachine>>;
  element: ReactNode;
}

const GameRoute = ({ matches, element }: GameRouteProps) => {
  const gameService = useGameService();

  const matchesRoute = useSelector(gameService, (state) => state.matches(matches));

  return matchesRoute ? <>{element}</> : null;
};

export default GameRoute;
