/**
 * Construye el objeto de reserva listo para enviar al servidor.
 * @param {Array} asientosSeleccionados - Arreglo de asientos elegidos
 * @returns {Object} datosReserva
 */
export function construirDatosReserva(asientosSeleccionados) {
  const formularios = document.querySelectorAll("#passenger-sections form");

  const pasajeros = [];
  formularios.forEach(form => {
    pasajeros.push({
      nombres: form.querySelector('input[name="nombres"]').value.trim(),
      apellidos: form.querySelector('input[name="apellidos"]').value.trim(),
      dni: form.querySelector('input[name="dni"]').value.trim(),
      fecha_nacimiento: form.querySelector('input[name="fecha-nacimiento"]').value,
    });
  });

  // Origen
  // ✅ Obtener origen de forma segura (valor por defecto o fijado)
  const origenInput = document.querySelector('input[name="origen"]');
  const origen = origenInput ? origenInput.value.trim() : "ICA"; // Fallback

  // Destino
  const destinoId = parseInt(document.querySelector('select[name="destino"]')?.value, 10);
  if (!destinoId || isNaN(destinoId)) throw new Error("⚠️ Destino inválido.");

  // Paquete (puede ser null)
  const paqueteValue = document.querySelector('select[name="paquete"]')?.value || null;
  const paqueteId = paqueteValue === "" ? null : parseInt(paqueteValue, 10);

  // Horario
  const horario = document.getElementById("horario")?.value;
  if (!horario) throw new Error("⏰ El horario es obligatorio.");

  // Tipo de pago
  const tipo_pago = document.getElementById("tipoPago")?.value;
  if (!tipo_pago) throw new Error("⚠️ No se seleccionó el método de pago.");

  // Precio por pasajero
  const precioUnitario = parseFloat(document.getElementById("precio_oculto")?.value || "0");
  if (isNaN(precioUnitario) || precioUnitario <= 0) throw new Error("❌ Precio inválido.");

  const total = precioUnitario * pasajeros.length;

  return {
    origen,
    destino_id: destinoId,
    paquete_id: paqueteId,
    horario,
    tipo_pago,
    total,
    pasajeros,
    asientos: asientosSeleccionados
  };
}
