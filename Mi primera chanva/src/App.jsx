import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [cedula, setCedula] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [updated, setUpdated] = useState('');

  const handleChange1 = (event) => setCedula(event.target.value);
  const handleChange2 = (event) => setPlaca(event.target.value);
  const handleChange3 = (event) => setMarca(event.target.value);

  const handleClick = () => {
    setUpdated(`Registro 1: ${cedula}, Registro 2: ${placa}, Registro 3: ${marca}`);
  };

  return (
    <div id="root">
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src= "public/logo.png" className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>REGISTRO DE VISITANTE</h1>

      <div className="container">
        <div className="registro">
          <label htmlFor="cedula" className='inputCedula'>CEDULA: </label>
          <input type="text" id="cedula" value={cedula} onChange={handleChange1} />
        </div>

        <div className="registro">
          <label htmlFor="placa" className='inputPlacas'>PLACAS: </label>
          <input type="text" id="placa" value={placa} onChange={handleChange2} />
        </div>

        <div className="registro">
          <label htmlFor="marca" className='inputMarca'>MARCA:</label>
          <input type="text" id="marca" value={marca} onChange={handleChange3} />
        </div>

        <div className="card">
          <button onClick={handleClick}>SOLICITAR</button>
        </div>
      </div>

      <p className="read-the-docs">{updated}</p>
    </div>
  );
}

export default App;
