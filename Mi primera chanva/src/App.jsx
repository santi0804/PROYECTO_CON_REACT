import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [id_producto, setProducto] = useState('');
  const [nombre_p, setNombre] = useState('');
  const [referencia_p, setReferencia] = useState('');
  const [valor_p, setValor] = useState('');
  const [mes_de_consumo, setMesConsumo] = useState('');
  const [fecha, setFecha] = useState('');
  const [updated, setUpdated] = useState('');

  const handleChange1 = (event) => setProducto(event.target.value);
  const handleChange2 = (event) => setNombre(event.target.value);
  const handleChange3 = (event) => setReferencia(event.target.value);
  const handleChange4 = (event) => setValor(event.target.value);
  const handleChange5 = (event) => setMesConsumo(event.target.value);
  const handleChange6 = (event) => setFecha(event.target.value);

  const handleClick = () => {
    setUpdated(`- ${id_producto}, - ${nombre_p}, - ${referencia_p}, - ${valor_p}, - ${mes_de_consumo}, - ${fecha}`, );
  };

  return (
    <div id="root">
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src= "public/logo.png" className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>REGISTRO DE VISITANTE</h1>
      <br />
      <br />
      <div className="container">
        <div className='container2'>
        <div className="registro">
          <label htmlFor="cedula" className="labelCedula">CEDULA: </label>
          <input  className="inputCedula"  type="text" id="cedula" value={id_producto} onChange={handleChange1} />
        </div>

        <div className="registro">
          <label htmlFor="placa" className='LabelNombre'>NOMBRE: </label>
          <input  className='inputNombre'type="text" id="nombre" value={nombre_p} onChange={handleChange2} />
        </div>

        <div className="registro">
          <label htmlFor="marca" className='labelMarca'>MARCA:</label>
          <input className='inputMarca' type="text" id="marca" value={referencia_p} onChange={handleChange3} />
        </div>

        <div className="registro">
          <label htmlFor="marca" className='labelValor'>VALOR:</label>
          <input className='inputValor' type="text" id="valor" value={valor_p} onChange={handleChange4} />
        </div>

        <div className="registro">
          <label htmlFor="marca" className='labelMes'>MES:</label>
          <input className='inputMes' type="text" id="mes" value={mes_de_consumo} onChange={handleChange5} />
        </div>

        <div className="registro">
          <label htmlFor="marca" className='labelFecha'>FECHA:</label>
          <input className='inputFecha' type="date" id="fecha" value={fecha} onChange={handleChange6} />
        </div>

        </div>

        <br />
        <div className="card">
          <button onClick={handleClick}>REGISTRAR</button>
        </div>
      </div>

      <p className="read-the-docs">{updated}</p>
    </div>
  );
}

export default App;
