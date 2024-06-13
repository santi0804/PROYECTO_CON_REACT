

try {
    const response = await fetch('http://localhost:8080/rutageneral/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setUpdated(`- ${id_producto}, - ${nombre_p}, - ${referencia_p}, - ${valor_p}, - ${mes_de_consumo}, - ${fecha}`);
    console.log(result);
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
};