import { useStateProvider } from "../context/ModalContext/StateProvider";
import { ReducerCases } from "../context/ModalContext/StateReducers";
import { useStatePuzzleProvider } from "../context/PuzzleContext/StatePuzzleProvider";

export default function Estadisticas() {
  
  const { dispatch } = useStateProvider();
  const {
    puzzle: { plays, victories, mysterious_word, show_mysterious_word, minute, second }
  } = useStatePuzzleProvider();

  return (
    <div
      className='absolute z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-opacity-75 transition-opacity bg-[#F3F3F3E3] dark:bg-[#262B3CE3]'></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto dark:text-'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-full sm:max-w-[35rem] dark:border dark:bg-[#262B3C] dark:border-[#939B9F]'>
            <div className=' py-5 px-10'>
              <h2 className='text-[35px] text-center font-bold'>
                Estadísticas
              </h2>
              <div className='flex justify-between items-center w-full sm:w-[80%] mx-auto my-6'>
                <div className='flex flex-col gap-3 items-center'>
                  <span className='text-[35px] font-bold'>{plays}</span>
                  <p className='text-[21px] font-normal'>Jugadas</p>
                </div>
                <div className='flex flex-col gap-3 items-center'>
                  <span className='text-[35px] font-bold'>{victories}</span>
                  <p className='text-[21px] font-normal'>Victorias</p>
                </div>
              </div>
              {show_mysterious_word && (
                <p className='text-center text-[19px] font-normal my-4'>
                  La palabra era:{" "}
                  <strong className='uppercase'>{mysterious_word}</strong>
                </p>
              )}
              <p className='text-center text-[19px] font-normal'>
                SIGUIENTE PALABRA
              </p>
              <p className='text-[24px] text-center'>
                <strong>
                  0{minute}:{second < 10 ? `0${second}` : second}
                </strong>
              </p>
            </div>
            <div className='px-4 py-3 text-center'>
              <button
                type='button'
                className='inline-flex justify-center rounded-md bg-[#6AAA64] px-10 py-2 text-[28px] font-semibold text-white shadow-sm'
                onClick={() => {
                  dispatch({ type: ReducerCases.SHOW_MODAL_STATISTICS });
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
