import React, { useState, useEffect } from 'react';
import { FaEdit, FaFileExcel } from 'react-icons/fa';  // librerias de react par los iconos
import * as XLSX from 'xlsx';
import { obtenerConsulta, ObtenerRegistros, fetchRegistros, actualizarDatos } from './api/api';
import Swal from 'sweetalert2';
import './App.css';

const formatDate = (isoString) => {   // funcion para dar formato a la fecha
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function App() {    //Declaración del Componente App:

  //Estados
  const [cedula_p, setCedula] = useState('');
  const [nombre_p, setNombre] = useState('');
  const [referencia_p, setReferencia] = useState('');
  const [valor_p, setValor] = useState('');
  const [mes_De_Consumo, setMesConsumo] = useState('');
  const [fecha_p, setFecha] = useState('');
  const [registros, setRegistros] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [errors, setErrors] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);


  //Manejador de cambios en los campos de entrada

  const handleChange1 = (event) => { setCedula(event.target.value); setErrors((prevErrors) => ({ ...prevErrors, cedula_p: '' })); };

  const handleChange2 = (event) => { setNombre(event.target.value); setErrors((prevErrors) => ({ ...prevErrors, nombre_p: '' })); };

  const handleChange3 = (event) => { setReferencia(event.target.value); setErrors((prevErrors) => ({ ...prevErrors, referencia_p: '' })); };

  const handleChange4 = (event) => { setValor(event.target.value); setErrors((prevErrors) => ({ ...prevErrors, valor_p: '' })); };

  const handleChange5 = (event) => { setMesConsumo(event.target.value); setErrors((prevErrors) => ({ ...prevErrors, mes_De_Consumo: '' })); };

  const handleChange6 = (event) => { setFecha(event.target.value); setErrors((prevErrors) => ({ ...prevErrors, fecha_p: '' })); };



  // Validación del formulario

  const validarFormato = () => {
    let formErrors = {};
    if (!cedula_p) formErrors.cedula_p = "Cedula es obligatorio";
    if (!nombre_p) formErrors.nombre_p = "Campo obligatorio";
    if (!referencia_p) formErrors.referencia_p = "Campo obligatorio";
    if (!valor_p) formErrors.valor_p = "Campo obligatorio";
    if (!mes_De_Consumo) formErrors.mes_De_Consumo = "Campo obligatorio";
    if (!fecha_p) formatDate.fecha_p = "Campo obligatoria";
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Validación',
        text: 'Complete los campos obligatorios',
      });
    }

    return Object.keys(formErrors).length === 0;
  };


  //Consulta de registros

  const handleClick = async () => {
    try {
      const data = await obtenerConsulta();
      console.log(data);
      setRegistros(data);
      setMostrarTabla(true);
    } catch (error) {
      console.error('Error en la consulta', error);
    }
  };


  //registro de nuevos datoss

  // Función para registrar nuevos datos
  const handleClickRegistrar = async () => {
    if (validarFormato()) { // Validar el formulario antes de registrar
      try {
        // Crear un nuevo objeto de registro
        const nuevoRegistro = {
          cedula_p: cedula_p.trim(),
          nombre_p: nombre_p.trim(),
          referencia_p: referencia_p.trim(),
          valor_p: parseFloat(valor_p),
          mes_De_Consumo: mes_De_Consumo.trim(),
          fecha_p: fecha_p
        };

        // Enviar el registro a la API
        await fetch('http://localhost:8080/rutageneral/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoRegistro)
        });

        // Obtener los registros actualizados
        const updatedRegistros = await fetchRegistros();
        setRegistros(updatedRegistros);

        // Limpiar el formulario después de un registro exitoso
        setCedula('');
        setNombre('');
        setReferencia('');
        setValor('');
        setMesConsumo('');
        setFecha('');

        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'El registro se ha realizado con éxito.',
        });
      } catch (error) {
        console.error('Error al registrar', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Registrar',
          text: 'Hubo un problema al registrar los datos.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos Obligatorios',
        text: 'Complete todos los campos obligatorios para registrar el formulario.',
      });
    }
  };



  // Actualización de datos

  const handleClickActualizar = async () => {
    console.log(registroSeleccionado.id_producto);

    if (validarFormato()) {
      try {

        //Verifiar si la cédula que intenta actualizar ya existe en otro registro
        const registroExistente = registros.find(registro => registro.cedula_p === cedula_p && registro.id_producto !== registroSeleccionado.id_producto
        );

        // Si se encuentra un registro con las misma cédula y no es el mismo que se esta editando, muestra error.
        if (registroExistente) {
          Swal.fire({
            icon: 'error',
            title: 'cedula duplicada',
            text: 'Ya existe un registro con esta cédula.',
          });
          return;
        }

        // Realizar la actualización en el registro seleccionado
        if (registroSeleccionado) {
          await actualizarDatos(
            registroSeleccionado.id_producto, // Usar id_producto para identificar el registro
            cedula_p,  // Cedula congelada, no se actualiza
            nombre_p,
            referencia_p,
            valor_p,
            fecha_p,
            mes_De_Consumo
          );

          // Obtener los registros actualizdos de la API
          const updatedRegistros = await fetchRegistros();
          setRegistros(updatedRegistros);

          Swal.fire({
            icon: 'success',
            title: 'Actualización Exitosa',
            text: 'Registro actulizado correctamente.',
          });

          // Limpiar el estado después de la actualización
          cerrarModal();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualización',
            text: 'No se encontro el registro para actualizar',
          });
        }

      } catch (error) {
        console.log('Error al actulizar', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Problema al actualizar registro.',
        });
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos Obligatorios',
        text: 'Complete los campos obligatorios...',
      });
    }
  };

  //Editar Icono 

  const editarRegistro = (registro) => {
    setRegistroSeleccionado(registro);
    setCedula(registro.cedula_p);
    setNombre(registro.nombre_p);
    setReferencia(registro.referencia_p);
    setValor(registro.valor_p);
    setMesConsumo(registro.mes_De_Consumo);
    setFecha(formatDate(registro.fecha_p)); // Formatea la fecha
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(true);
    setRegistroSeleccionado(null);
  };

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


  // Exportar datos a Excel

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(registrosOrdenados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");
    // Generar el archivo Excel
    XLSX.writeFile(workbook, "Registros.xlsx");
  };


  const registrosOrdenados = [...registros].sort((a, b) => a.id_producto - b.id_producto);

  return (

    <div id="root">
      <div className='sidebar'>
        <ul>
          <li><a href="#Inicio">INICIO</a></li>
          <li><a href="#registrar">REGISTRARCE</a></li>
          <li><a href="#login">LOGIN</a></li>
        </ul>
      </div>

      <div className='main-content'>
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
            <label htmlFor="cedula" className="labelCedula">CEDULA: </label>
            <input className="inputCedula" type="text" id="cedula" value={cedula_p} onChange={handleChange1} />
            {errors.cedula_p && <p className="error">{errors.cedula_p}</p>}
          </div>

          <div className="registro">
            <label htmlFor="placa" className='LabelNombre'>NOMBRE: </label>
            <input className='inputNombre' type="text" id="nombre" value={nombre_p} onChange={handleChange2} />
            {errors.nombre_p && <p className="error">{errors.nombre_p}</p>}
          </div>

          <div className="registro">
            <label htmlFor="marca" className='labelMarca'>MARCA:</label>
            <input className='inputMarca' type="text" id="marca" value={referencia_p} onChange={handleChange3} />
            {errors.referencia_p && <p className="error">{errors.referencia_p}</p>}
          </div>

          <div className="registro">
            <label htmlFor="marca" className='labelValor'>VALOR:</label>
            <input className='inputValor' type="number" id="valor" value={valor_p} onChange={handleChange4} />
            {errors.valor_p && <p className="error">{errors.valor_p}</p>}
          </div>

          <div className="registro">
            <label htmlFor="marca" className='labelMes'>MES:</label>
            <input className='inputMes' type="text" id="mes" value={mes_De_Consumo} onChange={handleChange5} />
            {errors.mes_De_Consumo && <p className="error">{errors.mes_De_Consumo}</p>}
          </div>

          <div className="registro">
            <label htmlFor="fecha" className='labelFecha'>FECHA:</label>
            <input className='inputFecha' type="date" id="fecha" value={fecha_p} onChange={handleChange6} />
            {errors.fecha_p && <p className="error">{errors.fecha_p}</p>}
          </div>
        </div>

        <br />

        <div className="card">
          <button type="button" onClick={handleClick}>CONSULTAR</button>
          <button type="button" onClick={handleClickRegistrar}>REGISTRAR</button>
          <button type="button" onClick={handleClickActualizar}>ACTUALIZAR</button>
        </div>
      </div>



      {mostrarTabla && registrosOrdenados.length > 0 && (
        <FaFileExcel className="excel-icon" onClick={exportToExcel} />
      )}
      <div className='tabla-container'>
        {mostrarTabla && (
          <table className="tabla-registros">
            <thead>
              <tr>
                <th> </th>
                <th>CEDULA</th>
                <th>NOMBRE</th>
                <th>REFERENCIA</th>
                <th>VALOR $</th>
                <th>MES DE CONSUMO</th>
                <th>FECHAS</th>
              </tr>
            </thead>

            <tbody>
              {registrosOrdenados.map((registro, index) => (
                <tr key={index}>
                  <td>
                    <FaEdit className="edit-icon" onClick={() => editarRegistro(registro)} />
                  </td>
                  <td>{registro.cedula_p}</td>
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
    </div>
  );
}
export default App;
