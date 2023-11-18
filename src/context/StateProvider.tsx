import { useContext } from "react";
import { StateContext } from "./StateContext";

export const useStateProvider = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateProvider must be used within a StateProvider");
  }
  return context;
};