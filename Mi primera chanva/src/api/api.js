

// Boton Endpoint Consultar
export async function obtenerConsulta() {
  try {
    const response = await fetch("http://localhost:8080/rutageneral/productos", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // aquí va la lógica del token o cookie si es necesario
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los puntos de venta');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los puntos de venta:', error.message);
    throw error;
  }
}

// Boton Endpoint registrar
export async function ObtenerRegistros(cedula_p, nombre_p, referencia_p, valor_p, fecha_p, mes_De_Consumo) {
  const url = 'http://localhost:8080/rutageneral/registro';
  const data = {
    cedula_p,
    nombre_p,
    referencia_p,
    valor_p,
    fecha_p,
    mes_De_Consumo
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Registro exitoso:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Boton Endpoint/ consultar tabla
export async function fetchRegistros() {
  try {
    const response = await fetch("http://localhost:8080/rutageneral/productos", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los registros');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los registros:', error.message);
    throw error;
  }
}

// Boton Endpoint/ para actualizar datos de la tabla
export async function actualizarDatos(cedula_p, nombre_p, referencia_p, valor_p, fecha_p, mes_De_Consumo) {
  const url = `http://localhost:8080/rutageneral/${id_producto}`;
  const data = {
    cedula_p,
    nombre_p,
    referencia_p,
    valor_p,
    fecha_p,
    mes_De_Consumo
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Actualización exitosa:', result);
    return result;
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
}
