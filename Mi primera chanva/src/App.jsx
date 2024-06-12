import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Parqueo1 from './parqueo1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>PARQUEO + RESERVAS</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          SOLICITAR {count}
        </button>
        <p>
          Su vehiculo bien cuidado
        </p>
      </div>
      <p className="read-the-docs"></p>

      <Parqueo1/>
    </>
    
  )
}

export default App
