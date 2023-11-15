import { useEffect, useState } from "react";
export default function useTable() {
  const matrizInicial = Array.from({ length: 5 }, () =>
    Array(5).fill({ color: "rgba(147, 155, 159, 0.30)", letter: "" })
  );
  const [palabra, setPalabra] = useState("");
  const [words, setWords] = useState<string[]>([]);
  // Estado para la matriz
  const [matriz, setMatriz] =
    useState<{ color: string; letter: string }[][]>(matrizInicial);
  const [position, setPosition] = useState<number[]>([0, 0]);
  const positionShowModal = [
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
  ];

  useEffect(() => {
    fetch("http://localhost:5173/src/assets/words.txt")
      .then((response) => response.text())
      .then((response) => {
        setWords(
          response
            .split("\n")
            .filter((line) => line.length === 5 && /^[a-zA-Z]+$/.test(line))
        );
        setPalabra(
          response
            .split("\n")
            .filter((line) => line.length === 5 && /^[a-zA-Z]+$/.test(line))[0]
        );
      });
  }, []);

  const seleccionWord = () => {
    const index = Math.floor(Math.random() * words?.length);
    const palabraSeleccionada = words[index];
    setPalabra(palabraSeleccionada);
    setWords((prev) => prev.filter((word) => word != palabraSeleccionada));
  };

  const verificarPalabra = () => {
    setMatriz((prevMatriz) => {
      const nuevaMatriz = [...prevMatriz];
      const word = [...prevMatriz[position[0]]];
      const wordle = word.map((word, index) => {
        let color = "rgba(147, 155, 159, 0.30)";
        const letter = word.letter;
        if (palabra.charAt(index) === letter) {
          color = "green";
        } else if (palabra.includes(letter)) {
          color = "#CEB02C";
        } else {
          color = "#939B9F";
        }
        return {
          color,
          letter,
        };
      });
      nuevaMatriz[position[0]] = wordle;
      return nuevaMatriz;
    });
  };

  const verfiryShowModal = (): boolean => {
    return positionShowModal.some((post) => post.join("") == position.join(""));
  };
  // Función para establecer un valor en una posición específica
  const setValorEnPosicion = (letter: string) => {
    const color = "rgba(147, 155, 159, 0.30)";
    setMatriz((prevMatriz) => {
      const nuevaMatriz = [...prevMatriz];
      nuevaMatriz[position[0]][position[1]] = {
        color,
        letter,
      };
      return nuevaMatriz;
    });
    setPosition((prevPosicio) => {
      const prevPosicion = [...prevPosicio];
      if (prevPosicion[1] < 5) {
        prevPosicion[1]++;
      }
      if (prevPosicion[1] == 5) {
        prevPosicion[1] = 0;
        prevPosicion[0]++;
      }
      if (prevPosicion.join("") == "50") {
        prevPosicion[0] = 4;
        prevPosicion[1] = 4;
      }
      return prevPosicion;
    });
  };

  return {
    matriz,
    setValorEnPosicion,
    verfiryShowModal,
    seleccionWord,
    verificarPalabra,
  };
}
