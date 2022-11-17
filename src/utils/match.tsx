import { createContext } from "react";
import type { State } from "xstate";

type inferTypeState<T> = T extends State<any, any, any, any, infer TypeState> ? TypeState : never;

type Get<T, K> = K extends keyof T ? T[K] : never;

type ToString<T> = T extends string ? T : never;

export type inferMatchesState<T> = ToString<Get<Get<inferTypeState<T>, "resolved">, "matchesStates">>;

type Config<T> = {
  [K in inferMatchesState<T>]: () => any;
};

type MatchReturnType<TConfig extends Config<any>> = {
  [K in keyof TConfig]: TConfig[K] extends () => infer TReturn ? TReturn : never;
}[keyof TConfig];

export const match = <TState extends State<any, any, any, any, any>, TConfig extends Config<TState>>(
  state: TState,
  config: TConfig
): MatchReturnType<TConfig> => {
  const matched = Object.keys(config).find((key) => state.matches(key));

  return config[matched as keyof TConfig]();
};

// const Matches = () => {
//   return children
// }
