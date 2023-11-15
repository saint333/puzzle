import { useState } from "react";
export default function useTable() {
  const matrizInicial = Array.from({ length: 5 }, () => Array(5).fill({color: "rgba(147, 155, 159, 0.30)", letter: ""}));
  const palabra = "color"
  // Estado para la matriz
  const [matriz, setMatriz] = useState<{color: string, letter: string}[][]>(matrizInicial);
  const [position, setPosition] = useState<number[]>([0,0])
  const positionShowModal = [[0,4], [1,4], [2, 4], [3, 4], [4,4]]

  const verfiryShowModal = (): boolean => {
    return positionShowModal.some(post => post.join("") == position.join(""))
  }
  // Función para establecer un valor en una posición específica
  const setValorEnPosicion = (letter: string) => {
    let color = "rgba(147, 155, 159, 0.30)"
    if (palabra.charAt(position[1]) === letter) {
      color = "green"
    }else if (palabra.includes(letter)) {
      color = "yellow"
    }else {
      color = "gray"
    }
    setMatriz((prevMatriz) => {
      const nuevaMatriz = [...prevMatriz];
      nuevaMatriz[position[0]][position[1]] = {
        color,
        letter
      };
      return nuevaMatriz;
    });
    setPosition(prevPosicio => {
      const prevPosicion = [...prevPosicio];
      if (prevPosicion[1] < 5) {
        prevPosicion[1]++
      }
      if (prevPosicion[1] == 5) {
        prevPosicion[1] = 0
        prevPosicion[0]++
      }
      if (prevPosicion.join("") == "50") {
        prevPosicion[0] = 4
        prevPosicion[1] = 4
      }
      return prevPosicion
    })
  }

  return {matriz, setValorEnPosicion, verfiryShowModal}
}
