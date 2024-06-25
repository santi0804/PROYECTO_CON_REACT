

import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import { obtenerConsulta, ObtenerRegistros, fetchRegistros } from './api/api';
import Swal from 'sweetalert2'
import './App.css';

function App() {
  const [id_producto, setProducto] = useState('');
  const [nombre_p, setNombre] = useState('');
  const [referencia_p, setReferencia] = useState('');
  const [valor_p, setValor] = useState('');
  const [mes_de_consumo, setMesConsumo] = useState('');
  const [fecha_p, setFecha] = useState('');
  const [registros, setRegistros] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [errors, setErrors] = useState({});


  const handleChange1 = (event) => setProducto(event.target.value);
  const handleChange2 = (event) => setNombre(event.target.value);
  const handleChange3 = (event) => setReferencia(event.target.value);
  const handleChange4 = (event) => setValor(event.target.value);
  const handleChange5 = (event) => setMesConsumo(event.target.value);
  const handleChange6 = (event) => setFecha(event.target.value);

  const validarFormato = () => {
    let formErrors = {};
    if (!id_producto) formErrors.id_producto = "Campo obligtario";
    if (!nombre_p) formErrors.nombre_p = "Campo obligtario";
    if (!referencia_p) formErrors.referencia_p = "Campo obligtario";
    if (!valor_p) formErrors.valor_p = "Campo obligtario";
    if (!mes_de_consumo) formErrors.mes_de_consumo = "Campo obligtario";
    if (!fecha_p) formErrors.fecha_p = "Campo obligtario";
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validacion',
        text: 'Por favor complete los campos obligatorios',
      });
    }
    return Object.keys(formErrors).length === 0;
  }


  const handleClick = async () => {
    try {
      const data = await obtenerConsulta();
      console.log(data);
      setRegistros(data);
      setMostrarTabla(true);
    } catch (error) {
      console.error('Error no es la consulta', error);
    }
  };


  const handleClickRegistrar = async () => {
    if (validarFormato()) {
      try {
        await ObtenerRegistros(id_producto, nombre_p, referencia_p, valor_p, fecha_p, mes_de_consumo);
        const updatedRegistros = await fetchRegistros();
        setRegistros(updatedRegistros);
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Registro éxito',
        });
      } catch (error) {
        console.error('Error al registrar', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Registrar',
          text: 'Problemas al registrar',
        });
      }
    }
  };

  // Boton consultar tablas //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRegistros();
        setRegistros(data);
      } catch (error) {
        console.error('Error al obtener los registros:', error);
      }
    };

    fetchData();
  }, []);


  // Ordenar los registros de manera descendente por id_producto

  const registrosOrdenados = [...registros].sort((a, b) => a.id_producto - b.id_producto);



  return (
    <div id="root">
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src="public/logo.png" className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>REGISTRO DE VISITANTE</h1>
      <br />
      <br />
      <div className="container">
        <div className='container2'>
          <div className="registro">
            <label htmlFor="cedula" className="labelCedula">ID: </label>
            <input className="inputCedula" type="number" id="cedula" value={id_producto} onChange={handleChange1} />
          </div>

          <div className="registro">
            <label htmlFor="placa" className='LabelNombre'>NOMBRE: </label>
            <input className='inputNombre' type="text" id="nombre" value={nombre_p} onChange={handleChange2} />
          </div>

          <div className="registro">
            <label htmlFor="marca" className='labelMarca'>MARCA:</label>
            <input className='inputMarca' type="text" id="marca" value={referencia_p} onChange={handleChange3} />
          </div>

          <div className="registro">
            <label htmlFor="marca" className='labelValor'>VALOR:</label>
            <input className='inputValor' type="number" id="valor" value={valor_p} onChange={handleChange4} />
          </div>

          <div className="registro">
            <label htmlFor="marca" className='labelMes'>MES:</label>
            <input className='inputMes' type="text" id="mes" value={mes_de_consumo} onChange={handleChange5} />
          </div>

          <div className="registro">
            <label htmlFor="marca" className='labelFecha'>FECHA:</label>
            <input className='inputFecha' type="datetime-local" id="fecha" value={fecha_p} onChange={handleChange6} />
          </div>
        </div>

        <br />

        <div className="card">
          <button type="button" onClick={handleClick}>CONSULTAR</button>
          <button type="button" onClick={handleClickRegistrar}>REGISTRAR</button>
        </div>
      </div>

      {mostrarTabla && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Referencia</th>
              <th>Valor $</th>
              <th>Mes de Consumo</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {registrosOrdenados.map((registro, index) => (
              <tr key={index}>
                <td>{registro.id_producto}</td>
                <td>{registro.nombre_p}</td>
                <td>{registro.referencia_p}</td>
                <td>{registro.valor_p}</td>
                <td>{registro.mes_De_Consumo}</td>
                <td>{registro.fecha_p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


export default App;