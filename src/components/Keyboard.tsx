import { useState } from "react";
import Cubo from "../utils/Cubo";

type ProspKey = {
  keys: string[];
  onClick: (event: string) => void;
  color: string;
  style: string;
};

const KeyboardRow = ({ keys, onClick, color, style }: ProspKey) => (
  <div className={style}>
    {keys.map((letter) => (
      <Cubo
        key={letter}
        size='sm'
        text={letter}
        onClick={() => onClick(letter)}
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

export default function Keyboard({handleKeyPress}: {handleKeyPress: (letter : string) => void}) {
  const [color] = useState("#D3D6DA");

  return (
    <div className='bg-[#DADCE04D] rounded-[15px] py-[33px] px-[10px] w-full dark:bg-[#DADCE008]'>
      <KeyboardRow
        keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]}
        onClick={handleKeyPress}
        color={color}
        style='flex justify-center gap-[10px]'
      />
      <KeyboardRow
        keys={["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"]}
        onClick={handleKeyPress}
        color={color}
        style='flex justify-center gap-[10px] ml-10 mt-2'
      />
      <KeyboardRow
        keys={[ "z", "x", "c", "v", "b", "n", "m"]}
        onClick={handleKeyPress}
        color={color}
        style='flex justify-center gap-[10px] mr-10 mt-2'
      />
    </div>
  );
}
