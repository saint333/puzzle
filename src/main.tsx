import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StateProvider } from './context/ModalContext/StateContext.tsx'
import { StatePuzzleProvider } from './context/PuzzleContext/StatePuzzleContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateProvider>
      <StatePuzzleProvider>
        <App />
      </StatePuzzleProvider>
    </StateProvider>
  </React.StrictMode>,
)
