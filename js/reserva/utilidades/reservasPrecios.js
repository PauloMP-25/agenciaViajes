// js/reservas/utilidades/reservasPrecios.js
/* ==============================================================================
Archivo: reservasPrecios.js
Descripción: Calcula y actualiza el precio total sumando el precio por pasajero.
=============================================================================== */

/**
 * ✅ Calcula el precio total real considerando número de pasajeros.
 * Puede recibir precioDestino y precioPaquete para ser llamado directamente.
 * Si no se pasan, intenta obtenerlos desde el DOM (modo automático).
 */
export function actualizarPrecioTotal() {
  const destinoSelect = document.getElementById("destino");
  const paqueteSelect = document.getElementById("paquete");
  const precioInput = document.getElementById("precio");
  const precioOculto = document.getElementById("precio_oculto");

  const cantidadPasajeros = document.querySelectorAll("#passenger-sections form").length;

  let precioUnitario = 0;

  const destinoSeleccionado = destinoSelect?.value;
  const paqueteSeleccionado = paqueteSelect?.value;

  if (!destinoSeleccionado) {
    if (precioInput) precioInput.value = "S/ 0.00";
    if (precioOculto) precioOculto.value = "0.00";
    return;
  }

  // 🧮 Si hay paquete seleccionado, usar solo su precio (ignorar precio destino)
  if (paqueteSeleccionado) {
    const precioStr = paqueteSelect.selectedOptions[0]?.dataset?.precio;
    const precio = parseFloat(precioStr);
    precioUnitario = isNaN(precio) ? 0 : precio;
  } else {
    const precioStr = destinoSelect.selectedOptions[0]?.dataset?.precio;
    const precio = parseFloat(precioStr);
    precioUnitario = isNaN(precio) ? 0 : precio;
  }

  const total = precioUnitario * cantidadPasajeros;

  if (precioInput) precioInput.value = `S/ ${total.toFixed(2)}`;
  if (precioOculto) precioOculto.value = total.toFixed(2);
}
