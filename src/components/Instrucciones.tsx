import Cubo from "../utils/Cubo";

type ProspInstrucciones = {
  setModalShowIntruccion: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Instrucciones({
  setModalShowIntruccion,
}: ProspInstrucciones) {
  return (
    <div
      className='absolute z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 transition-opacity bg-[#F3F3F3E3] dark:bg-[#262B3CE3]'></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all  sm:w-full sm:max-w-[35rem] dark:border dark:bg-[#262B3C] dark:border-[#939B9F]'>
            <div className='py-5 px-10'>
              <h2 className='text-[35px] text-center font-bold'>Cómo jugar</h2>
              <p className='text-[19px] font-[400] mt-4 mb-3'>
                Adivina la palabra oculta en cinco intentos. <br />
                Cada intento debe ser una palabra válida de 5 letras.
                <br />
                Después de cada intento el color de las letras cambia para
                mostrar qué tan cerca estás de acertar la palabra.
              </p>
              <p>
                <strong className='text-[19px] font-[700]'>Ejemplos</strong>
              </p>

              <div className='grid grid-cols-5 mt-3 mb-2'>
                {"gatos".split("").map((letter, index) => {
                  return (
                    <Cubo
                      key={letter}
                      size='lg'
                      text={letter}
                      style={{
                        backgroundColor: index === 0 ? "#6AAA64" : "inherit",
                        border: index != 0 ? "1px solid #000" : "",
                      }}
                    />
                  );
                })}
              </div>
              <p className='text-[19px]'>
                La letra <strong>G</strong> está en la palabra y en la posición
                correcta.
              </p>
              <div className='grid grid-cols-5 mt-3 mb-2'>
                {"vocal".split("").map((letter, index) => {
                  return (
                    <Cubo
                      key={letter}
                      size='lg'
                      text={letter}
                      style={{
                        backgroundColor: index === 2 ? "#CEB02C" : "inherit",
                        border: index != 2 ? "1px solid #000" : "",
                      }}
                    />
                  );
                })}
              </div>
              <p className='text-[19px]'>
                La letra <strong>C</strong> está en la palabra pero en la
                posición incorrecta.
              </p>
              <div className='grid grid-cols-5 mt-3 mb-2'>
                {"canto".split("").map((letter, index) => {
                  return (
                    <Cubo
                      key={letter}
                      size='lg'
                      text={letter}
                      style={{
                        backgroundColor: index === 4 ? "#939B9F" : "inherit",
                        border: index != 4 ? "1px solid #000" : "",
                      }}
                    />
                  );
                })}
              </div>
              <p className='text-[19px]'>
                La letra <strong>O</strong> no está en la palabra.
              </p>
              <p className='text-[19px] mt-5 mb-4'>
                Puede haber letras repetidas. Las pistas son independientes para
                cada letra.
              </p>
              <p className='text-[19px] text-center'>
                ¡Una palabra nueva cada 5 minutos!
              </p>
            </div>
            <div className='px-4 py-3 text-center'>
              <button
                type='button'
                className='inline-flex justify-center rounded-md bg-[#6AAA64] px-3 py-2 text-[28px] font-semibold text-white shadow-sm w-[200px]'
                onClick={() => {
                  setModalShowIntruccion(false);
                  localStorage.setItem("modalShowIntruccion", "false");
                }}
              >
                !JUGAR¡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
