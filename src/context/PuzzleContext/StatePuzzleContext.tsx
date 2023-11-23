import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import reducer, {
  Action,
  ReducerCasesPuzzle,
  initialState,
} from "./StatePuzzleReducers";

type StateProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  puzzle: typeof initialState;
  dispatchPuzzle: Dispatch<Action>;
};

export const StatePuzzleContext = createContext<ContextProps | undefined>(
  undefined
);

export const StatePuzzleProvider: React.FC<StateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const url = '/words.txt'
      try {
        const response = await fetch(url);
        const words = await response.text();
        const filteredWords = words
          .split("\n")
          .filter((line) => line.length === 5 && /^[a-zA-Z]+$/.test(line))
          .join(",");

        dispatch({
          type: ReducerCasesPuzzle.LIST_OF_WORDS,
          value: filteredWords,
        });
        dispatch({
          type: ReducerCasesPuzzle.MYSTERIOUS_WORD,
          value:
            filteredWords.split(",")[
              Math.floor(Math.random() * filteredWords.split(",").length)
            ],
        });
      } catch (error) {
        console.error("Error al cargar las palabras", error);
      }
    };

    fetchData();
  }, []);

  return (
    <StatePuzzleContext.Provider
      value={{ puzzle: state, dispatchPuzzle: dispatch }}
    >
      {children}
    </StatePuzzleContext.Provider>
  );
};
