import "./App.css";
import Header from "./components/Header";
import { NextUIProvider } from "@nextui-org/react";
import Cubo from "./utils/Cubo";
import Keyboard from "./components/Keyboard";
import { useEffect, useCallback, useMemo } from "react";
import Instrucciones from "./components/Instrucciones";
import Estadisticas from "./components/Estadisticas";
import { useStateProvider } from "./context/ModalContext/StateProvider";
import { ReducerCases } from "./context/ModalContext/StateReducers";
import { useStatePuzzleProvider } from "./context/PuzzleContext/StatePuzzleProvider";
import { ReducerCasesPuzzle } from "./context/PuzzleContext/StatePuzzleReducers";

function App() {
  const {
    state: { showModalInstructions, showModalStatistics },
    dispatch,
  } = useStateProvider();
  const {
    puzzle: {
      starting_board,
      starting_board_position: { x, y },
      mysterious_word,
      minute,
      second
    },
    dispatchPuzzle,
  } = useStatePuzzleProvider();

  const handleKeyPress = (letter: string) => {
    functionEventHandler(letter);
  };

  const positionShowModal = useMemo(
    () => [
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 4],
    ],
    []
  );

  const functionEventHandler = useCallback(
    async (e: string) => {
      if (
        /^[a-zA-Z]$/.test(e) &&
        !showModalStatistics &&
        starting_board[4][4].letter === ""
      ) {
        dispatchPuzzle({
          type: ReducerCasesPuzzle.ADD_LETTER_TO_BOARD,
          value: e,
        });
        dispatchPuzzle({ type: ReducerCasesPuzzle.SHOW_MODAL_INSTRUCTIONS });
        if (positionShowModal.some((post) => post[0] === x && post[1] === y)) {
          dispatchPuzzle({ type: ReducerCasesPuzzle.VERIFY_MYSTERIOUS_WORD });
          if (
            starting_board[x].map((e) => e.letter).join("") == mysterious_word
          ) {
            dispatchPuzzle({ type: ReducerCasesPuzzle.PLAYS });
            dispatchPuzzle({ type: ReducerCasesPuzzle.VICTORIES });
            dispatch({ type: ReducerCases.SHOW_MODAL_STATISTICS });
          }
          if (x === 4 && y === 4) {
            dispatchPuzzle({ type: ReducerCasesPuzzle.PLAYS });
            dispatchPuzzle({ type: ReducerCasesPuzzle.SHOW_MYSTERIOUS_WORD });
            dispatch({ type: ReducerCases.SHOW_MODAL_STATISTICS });
          }
        }
        dispatchPuzzle({ type: ReducerCasesPuzzle.CHANGE_BOARD_POSITION });
      }
    },
    [
      dispatch,
      mysterious_word,
      showModalStatistics,
      dispatchPuzzle,
      starting_board,
      x,
      y,
      positionShowModal,
    ]
  );

  useEffect(() => {
    const pressKey = async (e: KeyboardEvent) => {
      functionEventHandler(e.key);
    };
    document.addEventListener("keypress", pressKey);
    const timer = setTimeout(() => {
      if (second === 0 && minute === 0) {
        dispatchPuzzle({ type: ReducerCasesPuzzle.RESET });
        dispatchPuzzle({ type: ReducerCasesPuzzle.RESET_TIME });
        dispatchPuzzle({ type: ReducerCasesPuzzle.SHOW_MYSTERIOUS_WORD });
      }
      if (second === 0) {
        dispatchPuzzle({ type: ReducerCasesPuzzle.MINUTE });
        dispatchPuzzle({ type: ReducerCasesPuzzle.SECOND, value_second: 59 });
      }
      dispatchPuzzle({ type: ReducerCasesPuzzle.SECOND });
    }, 1000);
    return () => {
      document.removeEventListener("keypress", pressKey);
      clearTimeout(timer);
    };
  }, [functionEventHandler, dispatchPuzzle, minute, second]);

  return (
    <NextUIProvider>
      <div className='dark:bg-[#262B3C]'>
        <main className='w-[80%] m-auto h-[100vh] flex justify-center items-center gap-[70px] flex-col lg:w-[50%] relative'>
          <Header />
          <div className='grid grid-cols-5 grid-rows-5 gap-[11px]'>
            {starting_board.map((fila, pos) =>
              fila.map((col, index) => (
                <Cubo
                  key={pos + index}
                  size='lg'
                  text={col.letter}
                  style={{ backgroundColor: col.color }}
                />
              ))
            )}
          </div>
          <Keyboard handleKeyPress={handleKeyPress} />
          {showModalInstructions && <Instrucciones />}
          {showModalStatistics && <Estadisticas />}
        </main>
      </div>
    </NextUIProvider>
  );
}

export default App;
