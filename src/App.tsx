import "./App.css";
import Header from "./components/Header";
import { NextUIProvider } from "@nextui-org/react";
import Cubo from "./utils/Cubo";
import Keyboard from "./components/Keyboard";
import { useState, useEffect } from "react";
import Instrucciones from "./components/Instrucciones";
import Estadisticas from "./components/Estadisticas";
import useTable from "./hook/useTable";

function App() {
  const { matriz, setValorEnPosicion, verfiryShowModal, seleccionWord, verificarPalabra } = useTable();

  const [modalShowIntruccion, setModalShowIntruccion] = useState<boolean>(
    Boolean(!localStorage.getItem("modalShowIntruccion"))
  );
  const [modalShowEstadisticas, setModalShowEstadisticas] =
    useState<boolean>(false);

  const handleKeyPress = (letter: string) => {
    if (!modalShowEstadisticas) {
      setValorEnPosicion(letter);
      if (verfiryShowModal()) {
        verificarPalabra()
        setModalShowEstadisticas(true)
        // seleccionWord()
      }
    }
  };
  
  useEffect(() => {
    const pressKey = (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key) && !modalShowEstadisticas) {
        setValorEnPosicion(e.key);
        if (verfiryShowModal()) {
          verificarPalabra()
          setModalShowEstadisticas(true)
          // seleccionWord()
        }
      }
    };
    document.addEventListener("keypress", pressKey);
    return () => {
      document.removeEventListener("keypress", pressKey);
    }
  }, [setValorEnPosicion,verfiryShowModal, seleccionWord, modalShowEstadisticas, verificarPalabra])  ;

  return (
    <NextUIProvider>
      <main className='w-[80%] m-auto h-[100vh] flex justify-center items-center gap-[70px] flex-col lg:w-[50%]'>
        <Header
          setModalShowIntruccion={setModalShowIntruccion}
          setModalShowEstadisticas={setModalShowEstadisticas}
        />
        <div className='grid grid-cols-5 grid-rows-5 gap-[11px]'>
          {matriz.map((fila, pos) =>
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
        {modalShowIntruccion && (
          <Instrucciones setModalShowIntruccion={setModalShowIntruccion} />
        )}
        {modalShowEstadisticas && (
          <Estadisticas setModalShowEstadisticas={setModalShowEstadisticas} />
        )}
      </main>
    </NextUIProvider>
  );
}

export default App;
