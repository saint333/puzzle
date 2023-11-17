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
  const [minute, setMinute] = useState(1)
  const [second, setSecond] = useState(0)

  const handleKeyPress = (letter: string) => {
    if (!modalShowEstadisticas) {
      setValorEnPosicion(letter);
      if (verfiryShowModal()) {
        setModalShowEstadisticas(true);
        // seleccionWord()
      }
    }
  };

  useEffect(() => {
    const pressKey = async (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key) && !modalShowEstadisticas) {
        setValorEnPosicion(e.key);
        if (verfiryShowModal()) {
          await verificarPalabra();
          if (matriz[position[0]].map((e) => e.letter).join("") == palabra) {
            setVictoria((prev) => {
              const jugar = prev + 1;
              return jugar;
            });
          }
          setPunto((prev) => {
            const jugar = prev + 1;
            return jugar;
          });

          setModalShowEstadisticas(true);
        }
      }
    };
    document.addEventListener("keypress", pressKey);
    const time = setInterval(() => {
      if (second === 0 && minute === 0) {
        seleccionWord()
        setMinute(5)
        setSecond(5)
      }
      if (second == 0) {
        setSecond(60)
        setMinute(prev => {
          const actual = prev - 1
          return actual
        })
      }
      setSecond(prev => {
        const actual = prev - 1
        return actual
      })
    }, 1000)
    return () => {
      clearInterval(time);
      document.removeEventListener("keypress", pressKey);
    };
  }, [
    setValorEnPosicion,
    verfiryShowModal,
    seleccionWord,
    modalShowEstadisticas,
    verificarPalabra,
    palabra,
    matriz,
    position,
    minute,
    second
  ]);

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
          <Estadisticas
            setModalShowEstadisticas={setModalShowEstadisticas}
            punto={punto}
            victoria={victoria}
            second={second}
            minute={minute}
          />
        )}
      </main>
    </NextUIProvider>
  );
}

export default App;
