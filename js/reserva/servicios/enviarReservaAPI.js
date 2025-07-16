// reserva/servicios/enviarReservaAPI.js

/**
 * Envia la reserva completa al servidor.
 * @param {Object} datosReserva - Objeto con toda la información a enviar
 */
export async function enviarReserva(datosReserva) {
  const response = await fetch('/api/insertarReserva', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosReserva)
  });

  if (!response.ok) throw new Error("Error al guardar la reserva");
  return await response.json();
}
