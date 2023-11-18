import { Switch } from "@nextui-org/react";
import { SunIcon } from "../utils/SunIcon";
import { MoonIcon } from "../utils/MoonIcon";
import EstadisticasIcon from "../utils/EstadisticasIcon";
import InstruccionesIcon from "../utils/InstruccionesIcon";
import { useState, useEffect } from "react";
import { useStateProvider } from "../context/StateProvider";
import { ReducerCases } from "../context/StateReducers";

type ProspHeader = {
  setModalShowIntruccion: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Header({setModalShowIntruccion}: ProspHeader) {
  const {dispatch} = useStateProvider()
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true
    }
    return false
  })
  useEffect(() => {
    if (theme) {
      document.querySelector("html")?.classList.add("dark")
    } else {
      document.querySelector("html")?.classList.remove("dark")
    }
  }, [theme])
  
  return (
    <header className='flex justify-between py-[20px] px-[16px] bg-[#F3F3F3] rounded-[15px] w-full items-center dark:bg-[#dadce008]'>
      <InstruccionesIcon className="cursor-pointer dark:text-white" onClick={() => setModalShowIntruccion(true)}/>
      <h1 className="text-[#202537] text-[40px] font-bold dark:text-white">WORDLE</h1>
      <div className='flex gap-1'>
        <EstadisticasIcon className="cursor-pointer dark:text-white" onClick={() => dispatch({type: ReducerCases.SHOW_MODAL_STATISTICS})}/>
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
          isSelected={!theme} onValueChange={() => setTheme(!theme)}
        />
      </div>
    </header>
  );
}
