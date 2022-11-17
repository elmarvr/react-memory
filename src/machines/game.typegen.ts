// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.after(1000)#game.board.solution": {
      type: "xstate.after(1000)#game.board.solution";
    };
    "xstate.after(1000)#game.countdown": {
      type: "xstate.after(1000)#game.countdown";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    clearBoard: "xstate.after(1000)#game.board.solution";
    decreaseLives: "";
    decrementCount: "xstate.after(1000)#game.countdown";
    generateBoard: "";
    generateSolution: "";
    levelUp: "";
    onTileClick: "TILE.CLICK";
    resetGame: "START";
    showSolution: "";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    gameOver: "";
    levelFailed: "";
    levelSuccess: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "beforeRestart"
    | "beforeStart"
    | "board"
    | "board.solution"
    | "board.user"
    | "countdown"
    | { board?: "solution" | "user" };
  tags: never;
}
