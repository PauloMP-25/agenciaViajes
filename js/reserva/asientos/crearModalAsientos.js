import { obtenerAsientosOcupados } from "../asientos/asientosAPI.js";
import { generarAsientos } from "../asientos/generarAsientos.js";
import { manejarSeleccionAsientos } from "../asientos/eventosAsientos.js";
import { construirDatosReserva } from "../utilidades/construirDatosReserva.js";
import { enviarReserva } from "../servicios/enviarReservaAPI.js";

/**
 * @param {number} cantidadPasajeros
 * @param {number} destinoId
 * @param {function|null} onConfirmar (puede ser null, ya no se usa)
 * @param {string} nombre - Nombre del destino
 * @param {number|string} precio - Precio total
 */
export async function crearModalAsientos(cantidadPasajeros, destinoId, onConfirmar, nombre, precio) {
  if (!destinoId) {
    console.warn("⚠️ No se proporcionó destinoId válido.");
    return;
  }
  if (document.querySelector("#modalAsientos")) return;

  const ocupados = await obtenerAsientosOcupados(destinoId);

  const modal = document.createElement("div");
  modal.id = "modalAsientos";
  modal.classList.add("modal-asientos");

  modal.innerHTML = `
    <div class="modal-contenido">
      <div class="seccion-izquierda">
        <h3 class="titulo-seccion">Selecciona tus asientos</h3>
        <div id="contenedorAsientos" class="bus-asientos"></div>
      </div>

      <div class="seccion-derecha">
        <h3 class="titulo-seccion">Resumen</h3>
        <p><strong>Destino:</strong> <span id="resumenDestino">${nombre}</span></p>
        <p><strong>Precio total:</strong> <span id="resumenPrecio">S/ ${precio}</span></p>
        <p><strong>Pasajeros:</strong> ${cantidadPasajeros}</p>
        <p><strong>Asientos seleccionados:</strong> <span id="asientosSeleccionados">0</span></p>

        <label for="tipoPago"><strong>Método de pago:</strong></label>
        <select id="tipoPago" class="input-field">
          <option value="yape">Yape</option>
          <option value="plin">Plin</option>
          <option value="transferencia">Transferencia</option>
        </select>

        <div id="imagenQR" class="imagen-qr">
          <img src="/activos/img/reserva/yape.jpg" alt="QR de pago" id="qrImagen" />
        </div>

        <div class="acciones-modal">
          <button class="boton-cancelar" id="cerrarModalAsientos">Cancelar</button>
          <button class="boton-confirmar" id="confirmarReservaBtn">Confirmar</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // ✅ Generar y permitir seleccionar
  generarAsientos(cantidadPasajeros, ocupados);

  // ✅ Habilitar selección y procesar reserva
  manejarSeleccionAsientos(cantidadPasajeros, async (asientosSeleccionados) => {
    try {
      const datosReserva = construirDatosReserva(asientosSeleccionados);
      console.log("📦 Datos que se enviarán:", datosReserva); // 👈 Agregado
      await enviarReserva(datosReserva);
      alert("✅ Reserva completada con éxito.");
      modal.remove();
    } catch (err) {
      console.error("❌ Error al construir o enviar la reserva:", err.message);
      alert("Ocurrió un error. Revisa los datos e intenta nuevamente.");
    }
  });

  // Cerrar modal
  document.getElementById("cerrarModalAsientos").onclick = () => modal.remove();

  // Cambiar imagen de QR según tipo de pago
  const tipoPago = document.getElementById("tipoPago");
  const qrImg = document.getElementById("qrImagen");

  tipoPago.addEventListener("change", () => {
    const metodo = tipoPago.value;
    const ruta = `/activos/img/reserva/${metodo}.jpg`;
    qrImg.src = ruta;
    qrImg.alt = `QR de ${metodo}`;
  });
}
