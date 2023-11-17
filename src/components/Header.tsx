import { Switch } from "@nextui-org/react";
import { SunIcon } from "../utils/SunIcon";
import { MoonIcon } from "../utils/MoonIcon";
import EstadisticasIcon from "../utils/EstadisticasIcon";
import InstruccionesIcon from "../utils/InstruccionesIcon";
import { useState, useEffect } from "react";

type ProspHeader = {
  setModalShowIntruccion: React.Dispatch<React.SetStateAction<boolean>>,
  setModalShowEstadisticas: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({setModalShowIntruccion, setModalShowEstadisticas}: ProspHeader) {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)')) {
      return true
    }
    return false
  })
  useEffect(() => { 
    if (theme) {
      document.querySelector("html")?.classList.remove("dark")
    } else {
      document.querySelector("html")?.classList.add("dark")
    }
    return () => {
      
    }
  }, [theme])
  
  return (
    <header className='flex justify-between py-[20px] px-[16px] bg-[#F3F3F3] rounded-[15px] w-full items-center dark:bg-[#dadce008]'>
      <InstruccionesIcon className="cursor-pointer dark:text-white" onClick={() => setModalShowIntruccion(true)}/>
      <h1 className="text-[#202537] text-[40px] font-bold dark:text-white">WORDLE</h1>
      <div className='flex gap-1'>
        <EstadisticasIcon className="cursor-pointer dark:text-white" onClick={() => setModalShowEstadisticas(true)}/>
        <Switch
          size='lg'
          color='success'
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
          isSelected={theme} onValueChange={setTheme}
        />
      </div>
    </header>
  );
}
