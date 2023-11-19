export enum ReducerCasesPuzzle {
  LIST_OF_WORDS = "LIST_OF_WORDS",
  MYSTERIOUS_WORD = "MYSTERIOUS_WORD",
  SHOW_MODAL_INSTRUCTIONS = "SHOW_MODAL_INSTRUCTIONS",
  ADD_LETTER_TO_BOARD = "ADD_LETTER_TO_BOARD",
  VERIFY_MYSTERIOUS_WORD = "VERIFY_MYSTERIOUS_WORD",
  SHOW_MYSTERIOUS_WORD = "SHOW_MYSTERIOUS_WORD",
  PLAYS = "PLAYS",
  VICTORIES = "VICTORIES",
  SECOND = "SECOND",
  MINUTE = "MINUTE",
  RESET_TIME = "RESET_TIME",
  RESET = "RESET",
}

export type State = {
  starting_board: Array<Array<{ color: string; letter: string }>>;
  list_of_words: Array<string>;
  mysterious_word: string;
  starting_board_position: { x: number; y: number };
  show_modal_instruction: boolean;
  verify_mysterious_word: boolean;
  show_mysterious_word: boolean;
  plays: number;
  minute: number;
  second: number;
  victories: number;
};

export const initialState: State = {
  starting_board: Array.from({ length: 5 }, () =>
    Array(5).fill({ color: "rgba(147, 155, 159, 0.30)", letter: "" })
  ),
  list_of_words: [""],
  mysterious_word: "",
  starting_board_position: { x: 0, y: 0 },
  show_modal_instruction: false,
  verify_mysterious_word: false,
  show_mysterious_word: false,
  plays: 0,
  victories: 0,
  minute: 1,
  second: 0,
};

export type Action = {
  type: ReducerCasesPuzzle;
  value?: string;
  value_second?: number;
};

const reducer = (state: State, action: Action): State => {
  const { x, y } = state.starting_board_position;
  const positionShowModal = [
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
  ];
  const prevPosicion = { x: x, y: y };

  switch (action.type) {
    case ReducerCasesPuzzle.LIST_OF_WORDS:
      return { ...state, list_of_words: action?.value?.split(",") || [] };
    case ReducerCasesPuzzle.MYSTERIOUS_WORD:
      return { ...state, mysterious_word: action.value || "" };
    case ReducerCasesPuzzle.SHOW_MODAL_INSTRUCTIONS:
      return {
        ...state,
        show_modal_instruction: positionShowModal.some(
          (post) =>  post[0] === state.starting_board_position.x && post[1] === state.starting_board_position.y
        ),
      };
    case ReducerCasesPuzzle.ADD_LETTER_TO_BOARD:
      console.log(x,y)
      if (prevPosicion.y < 5) {
        prevPosicion.y = y + 1;
      }
      if (prevPosicion.y == 5) {
        prevPosicion.y = 0;
        prevPosicion.x = x + 1;
      }
      if (prevPosicion.x === 5 && prevPosicion.y === 0) {
        prevPosicion.x = 4;
        prevPosicion.y = 4;
      }
      return {
        ...state,
        starting_board: state.starting_board.map((row, rowIndex) =>
          rowIndex === x
            ? row.map((cell, colIndex) =>
                colIndex === y
                  ? { letter: action.value || "", color: cell.color }
                  : cell
              )
            : row
        ),
        show_modal_instruction: positionShowModal.some(
          (post) =>  post[0] === state.starting_board_position.x && post[1] === state.starting_board_position.y
        ),
        starting_board_position: prevPosicion,
      };
    case ReducerCasesPuzzle.VERIFY_MYSTERIOUS_WORD:
      return {
        ...state,
        starting_board: state.starting_board.map((row, rowIndex) =>
          rowIndex === x
            ? row.map((cell, colIndex) =>
                colIndex === y
                  ? {
                      letter: cell.letter || "",
                      color:
                        state.mysterious_word.charAt(colIndex) === cell.letter
                          ? "green"
                          : state.mysterious_word.includes(cell.letter)
                          ? "#CEB02C"
                          : "#939B9F",
                    }
                  : cell
              )
            : row
        ),
      };
    case ReducerCasesPuzzle.SHOW_MYSTERIOUS_WORD:
      return { ...state, show_mysterious_word: !state.show_mysterious_word };
    case ReducerCasesPuzzle.PLAYS:
      return { ...state, plays: state.plays++ };
    case ReducerCasesPuzzle.VICTORIES:
      return { ...state, victories: state.victories++ };
    case ReducerCasesPuzzle.MINUTE:
      return { ...state, minute: state.minute-- };
    case ReducerCasesPuzzle.SECOND:
      return { ...state, second: action.value_second || state.second-- };
    case ReducerCasesPuzzle.RESET_TIME:
      return { ...state, minute: 5, second: 0 };
    case ReducerCasesPuzzle.RESET:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
