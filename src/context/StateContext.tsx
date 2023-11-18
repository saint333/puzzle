import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import reducer, { Action, initialState } from "./StateReducers";

type StateProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  state: typeof initialState;
  dispatch: Dispatch<Action>;
};

export const StateContext = createContext<ContextProps | undefined>(undefined);

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
