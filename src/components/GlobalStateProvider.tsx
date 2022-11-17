import { useInterpret } from "@xstate/react";
import { createContext, ReactNode, useContext } from "react";
import { InterpreterFrom } from "xstate";
import { gameMachine } from "../machines/game";

interface GlobalStateContext {
  gameService: InterpreterFrom<typeof gameMachine>;
}

const globalStateContext = createContext({} as GlobalStateContext);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const gameService = useInterpret(gameMachine);

  return <globalStateContext.Provider value={{ gameService }}>{children}</globalStateContext.Provider>;
};

export const useGameService = () => {
  const { gameService } = useContext(globalStateContext);

  return gameService;
};
