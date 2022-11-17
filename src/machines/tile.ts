import { ActorRefFrom, createMachine, sendParent } from "xstate";

export const tileMachine = createMachine(
  {
    id: "tile",

    initial: "default",

    predictableActionArguments: true,

    schema: {
      context: {
        index: 0,
      },

      events: {} as { type: "CORRECT_GUESS" | "RESET" | "WRONG_GUESS" } | { type: "CLICK"; index: number },
    },

    tsTypes: {} as import("./tile.typegen").Typegen0,

    states: {
      default: {
        on: {
          CLICK: {
            actions: "onClick",
          },

          CORRECT_GUESS: "active",

          WRONG_GUESS: "wrong",
        },
      },

      wrong: {
        on: {
          RESET: "default",
        },
      },

      active: {
        on: {
          RESET: "default",
        },
      },
    },
  },
  {
    actions: {
      onClick: sendParent((context) => ({
        type: "TILE.CLICK",
        index: context.index,
      })),
    },
  }
);

export type TileActor = ActorRefFrom<typeof tileMachine>;
