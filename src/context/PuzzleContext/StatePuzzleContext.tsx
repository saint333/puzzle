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
  const { minute, second } = state;

  useEffect(() => {
    const fetchData = async () => {
      const url = '/public/words.txt'
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (second === 0 && minute === 0) {
        dispatch({ type: ReducerCasesPuzzle.RESET });
        dispatch({ type: ReducerCasesPuzzle.RESET_TIME });
        dispatch({ type: ReducerCasesPuzzle.SHOW_MYSTERIOUS_WORD });
      }
      if (second === 0) {
        dispatch({ type: ReducerCasesPuzzle.MINUTE });
        dispatch({ type: ReducerCasesPuzzle.SECOND, value_second: 59 });
      }
      dispatch({ type: ReducerCasesPuzzle.SECOND });
    }, 1000);

    return () => clearTimeout(timer);
  }, [minute, second]);

  return (
    <StatePuzzleContext.Provider
      value={{ puzzle: state, dispatchPuzzle: dispatch }}
    >
      {children}
    </StatePuzzleContext.Provider>
  );
};
