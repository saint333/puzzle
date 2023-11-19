export enum ReducerCases {
  SHOW_MODAL_STATISTICS = 'SHOW_MODAL_STATISTICS',
  SHOW_MODAL_INSTRUCTIONS = 'SHOW_MODAL_INSTRUCTIONS'
}

export type State = {
  showModalStatistics: boolean;
  showModalInstructions: boolean;
};

export const initialState: State = {
  showModalStatistics: false,
  showModalInstructions: Boolean(!localStorage.getItem("modalShowIntruccion")),
};

export type Action = {
  type: ReducerCases;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ReducerCases.SHOW_MODAL_INSTRUCTIONS:
      return { ...state, showModalInstructions: !state.showModalInstructions };
    case ReducerCases.SHOW_MODAL_STATISTICS:
      return { ...state, showModalStatistics: !state.showModalStatistics };
    default:
      return state;
  }
};

export default reducer;
