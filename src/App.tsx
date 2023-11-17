import "./App.css";
import Header from "./components/Header";
import { NextUIProvider } from "@nextui-org/react";
import Cubo from "./utils/Cubo";
import Keyboard from "./components/Keyboard";
import { useState, useEffect, useCallback } from "react";
import Instrucciones from "./components/Instrucciones";
import Estadisticas from "./components/Estadisticas";
import useTable from "./hook/useTable";

function App() {
  const {
    matriz,
    palabra,
    position,
    setValorEnPosicion,
    verfiryShowModal,
    seleccionWord,
    verificarPalabra,
  } = useTable();

  const [modalShowIntruccion, setModalShowIntruccion] = useState<boolean>(
    Boolean(!localStorage.getItem("modalShowIntruccion"))
  );
  const [modalShowEstadisticas, setModalShowEstadisticas] =
    useState<boolean>(false);

  const [punto, setPunto] = useState(0);
  const [victoria, setVictoria] = useState(0);
  const [minute, setMinute] = useState(1);
  const [second, setSecond] = useState(0);
  const [showPalabra, setShowPalabra] = useState(false);

  const handleKeyPress = (letter: string) => {
    functionEventHandler(letter);
  };

  const functionEventHandler = useCallback(
    async (e: string) => {
      if (
        /^[a-zA-Z]$/.test(e) &&
        !modalShowEstadisticas &&
        matriz[4][4].letter === ""
      ) {
        setValorEnPosicion(e);
        if (verfiryShowModal()) {
          await verificarPalabra();
          if (matriz[position[0]].map((e) => e.letter).join("") == palabra) {
            setVictoria((prev) => {
              const jugar = prev + 1;
              return jugar;
            });
            setPunto((prev) => {
              const jugar = prev + 1;
              return jugar;
            });
            setModalShowEstadisticas(true);
          }
          if (position.join("") === "44") {
            setPunto((prev) => {
              const jugar = prev + 1;
              return jugar;
            });
            setShowPalabra(true);
            setModalShowEstadisticas(true);
          }
        }
      }
    },
    [
      matriz,
      position,
      modalShowEstadisticas,
      setValorEnPosicion,
      verfiryShowModal,
      verificarPalabra,
      palabra,
    ]
  );

  useEffect(() => {
    const pressKey = async (e: KeyboardEvent) => {
      functionEventHandler(e.key);
    };
    document.addEventListener("keypress", pressKey);
    const time = setInterval(() => {
      if (second === 0 && minute === 0) {
        seleccionWord();
        setMinute(5);
        setSecond(5);
        setShowPalabra(false);
      }
      if (second == 0) {
        setSecond(60);
        setMinute((prev) => {
          const actual = prev - 1;
          return actual;
        });
      }
      setSecond((prev) => {
        const actual = prev - 1;
        return actual;
      });
    }, 1000);
    return () => {
      clearInterval(time);
      document.removeEventListener("keypress", pressKey);
    };
  }, [seleccionWord, minute, second, functionEventHandler]);

  return (
    <NextUIProvider>
      <div className="dark:bg-[#262B3C]">
        <main className='w-[80%] m-auto h-[100vh] flex justify-center items-center gap-[70px] flex-col lg:w-[50%] relative'>
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
            <Estadisticas
              setModalShowEstadisticas={setModalShowEstadisticas}
              punto={punto}
              victoria={victoria}
              second={second}
              minute={minute}
              palabra={palabra}
              showPalabra={showPalabra}
            />
          )}
        </main>
      </div>
    </NextUIProvider>
  );
}

export default App;
