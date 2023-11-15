type ProspEstadisticas = {
  setModalShowEstadisticas: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Estadisticas({
  setModalShowEstadisticas,
}: ProspEstadisticas) {
  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-full sm:max-w-[35rem]'>
            <div className='bg-white py-5 px-10'>
              <h2 className='text-[35px] text-center font-bold'>Estadísticas</h2>
              <div className='flex justify-between items-center w-full sm:w-[80%] mx-auto my-6'>
                <div className="flex flex-col gap-3 items-center">
                  <span className="text-[35px] font-bold">2</span>
                  <p className="text-[21px] font-normal">Jugadas</p>
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <span className="text-[35px] font-bold">2</span>
                  <p className="text-[21px] font-normal">Victorias</p>
                </div>
              </div>
              <p className="text-center text-[19px] font-normal">
              SIGUIENTE PALABRA
              </p>
              <p className="text-[24px] text-center"><strong>04:10</strong></p>
            </div>
            <div className='px-4 py-3 text-center'>
              <button
                type='button'
                className='inline-flex justify-center rounded-md bg-[#6AAA64] px-10 py-2 text-[28px] font-semibold text-white shadow-sm'
                onClick={() => {
                  setModalShowEstadisticas(false);
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
