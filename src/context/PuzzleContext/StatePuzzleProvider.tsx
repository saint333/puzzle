import { useContext } from "react";
import { StatePuzzleContext } from "./StatePuzzleContext";

export const useStatePuzzleProvider = () => {
  const context = useContext(StatePuzzleContext);
  if (!context) {
    throw new Error("useStateProvider must be used within a StateProvider");
  }
  return context;
};