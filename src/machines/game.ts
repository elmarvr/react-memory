import { assign, createMachine, InterpreterFrom, spawn } from "xstate";
import { TileActor, tileMachine } from "./tile";

const initialContext = {
  level: 1,
  tiles: [] as TileActor[],
  solution: [] as number[],
  input: [] as number[],
  mistakes: 0,
  lives: 3,
  count: 3,
  size: 3,
};

export const gameMachine = createMachine(
  {
    id: "game",

    initial: "beforeStart",

    tsTypes: {} as import("./game.typegen").Typegen0,

    predictableActionArguments: true,

    context: initialContext,

    states: {
      beforeStart: {
        on: {
          START: "countdown",
        },
      },

      beforeRestart: {
        id: "beforeRestart",

        on: {
          START: {
            target: "countdown",
            actions: "resetGame",
          },
        },
      },

      countdown: {
        after: {
          1000: {
            actions: "decrementCount",
            target: "countdown",
          },
        },

        always: [
          {
            cond: (context) => context.count === 0,
            target: "board",
          },
        ],
      },

      board: {
        initial: "solution",

        always: [
          {
            cond: "gameOver",
            target: "#beforeRestart",
          },
        ],

        states: {
          solution: {
            entry: [
              assign({
                input: [],
                mistakes: 0,
              }),
              "generateBoard",
              "generateSolution",
              "showSolution",
            ],

            after: {
              1000: "user",
            },
          },

          user: {
            entry: ["clearBoard"],

            on: {
              "TILE.CLICK": {
                actions: "onTileClick",
              },
            },

            always: [
              {
                cond: "levelFailed",
                actions: "decreaseLives",

                target: "solution",
              },
              {
                cond: "levelSuccess",
                actions: "levelUp",
                target: "solution",
              },
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      generateBoard: assign((context) => {
        return {
          ...context,
          tiles: Array.from({ length: context.size ** 2 }, (_, index) =>
            spawn(tileMachine.withContext({ index }), `tile-${index}`)
          ),
        };
      }),

      clearBoard: (context) => {
        context.tiles.forEach((tile) => tile.send("RESET"));
      },

      generateSolution: assign((context) => {
        const solution = [];
        const indexes = Array.from({ length: context.tiles.length }, (_, index) => index);

        const solutionLength = context.level + 2;

        for (let i = 0; i < solutionLength; i++) {
          const index = Math.floor(Math.random() * indexes.length);
          solution.push(indexes[index]);
          indexes.splice(index, 1);
        }

        return {
          ...context,
          solution,
        };
      }),

      showSolution: (context) => {
        context.solution.forEach((index) => {
          context.tiles[index].send("CORRECT_GUESS");
        });
      },

      onTileClick: assign((context, event) => {
        const { index } = event;

        const tile = context.tiles[index];

        const isCorrect = context.solution.includes(index);

        if (isCorrect) {
          tile.send("CORRECT_GUESS");

          return {
            ...context,
            input: [...context.input, index],
          };
        }

        tile.send("WRONG_GUESS");

        return {
          ...context,
          mistakes: context.mistakes + 1,
        };
      }),

      levelUp: assign({
        size: (context) => context.size + ((context.level + 1) % 5 === 0 ? 1 : 0),
        level: (context) => context.level + 1,
      }),

      decrementCount: assign({
        count: (context) => context.count - 1,
      }),

      resetGame: assign(initialContext),

      decreaseLives: assign({
        lives: (context) => context.lives - 1,
      }),
    },

    guards: {
      levelSuccess: (context) => {
        return context.input.length === context.solution.length;
      },

      levelFailed: (context) => {
        return context.mistakes >= 3;
      },

      gameOver: (context) => {
        return context.lives <= 0;
      },
    },
  }
);
