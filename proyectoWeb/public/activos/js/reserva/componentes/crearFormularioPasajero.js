// js/reserva/componentes/crearFormularioPasajero.js
/* ==============================================================================
Crea un formulario de pasajero individual, ya sea principal o adicional.
Usado por: reservasFormulario.js
=============================================================================== */
import { generarCampo } from "./generarCampo.js";
import { verificarLimitePasajerosPorPaquete } from "../utilidades/validarLimitesPasajeros.js";
import { clonarOpcionesSelect } from "../utilidades/clonarOpcionesSelect.js";
import { actualizarPrecioTotal } from "../utilidades/reservasPrecios.js";

export function crearFormularioPasajero(container, esAdicional) {
  const formId = esAdicional ? '' : 'reservation-form';
  const label = esAdicional ? 'PASAJERO ADICIONAL' : 'PASAJERO PRINCIPAL';

const section = document.createElement('div');
section.className = "passenger-section w-full sm:w-[48%] lg:w-[45%] max-w-[500px]";
section.innerHTML = `
      <h2 class="passenger-title font-semibold">${label}</h2>
      <form ${formId ? `id="${formId}"` : ''} class="${esAdicional ? 'additional-passenger' : ''}">
        ${generarCampo('origen', 'ORIGEN', 'ICA', esAdicional)}
        ${generarCampo('destino', 'DESTINO', '-- Selecciona destino --', esAdicional, true, false, 'select', 'destino')}
        ${generarCampo('paquete', 'PAQUETE', '-- Selecciona paquete --', esAdicional, true)}
        ${!esAdicional ? `
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">HORARIO DE SALIDA</label>
            <select id="horario" class="input-field bg-gray-100 cursor-not-allowed" disabled>
              <option value="">-- Ninguno --</option>
            </select>
          </div>
        ` : ''}
        ${generarCampo('nombres', 'NOMBRES', 'Nombres completos', esAdicional)}
        ${generarCampo('apellidos', 'APELLIDOS', 'Apellidos completos', esAdicional)}
        ${generarCampo('fecha-nacimiento', 'FECHA DE NACIMIENTO', '', esAdicional, false, 'date')}
        ${generarCampo('dni', 'NÚMERO DE DNI', 'Número de documento', esAdicional)}

        ${esAdicional ? `
          <button type="button" class="remove-passenger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
            Eliminar Pasajero
          </button>
        ` : `
          <input type="hidden" id="precio_oculto" name="precio_oculto" />
          <input type="hidden" id="paquete_tipo_oculto" name="paquete_tipo_oculto" />
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">PRECIO TOTAL</label>
            <input type="text" id="precio" readonly class="input-field bg-gray-100" />
            <p class="precio-nota text-sm text-gray-500 italic mt-1">
              * El precio total se calcula por cada pasajero.
            </p>
          </div>
          <div class="contenedor-boton-reservar flex items-center gap-4 justify-center mt-4">
            <button type="button" id="botonReservar" class="boton-reservar">
              Seleccionar Asientos
            </button>
            <button type="button" id="add-passenger">
              <img src="/activos/img/reserva/nuevo.png" alt="+" class="w-5 h-5" />
            </button>
          </div>
        `}
      </form>
    `;
  container.appendChild(section);

    if (!esAdicional) {
    const addPassengerBtn = section.querySelector('#add-passenger');
    if (addPassengerBtn) {
      addPassengerBtn.addEventListener('click', () => {
        crearFormularioPasajero(container, true);
        actualizarPrecioTotal();
      });
    }
  }

  if (esAdicional) {
    const nuevoForm = section.querySelector('form');

    const origenNuevo = nuevoForm.querySelector('input[name="origen"]');
    const destinoSelect = nuevoForm.querySelector('select[name="destino"]');
    const paqueteSelect = nuevoForm.querySelector('select[name="paquete"]');

    // ORIGEN sincronizado
    const origen = document.getElementById('origen')?.value;
    if (origenNuevo) {
      origenNuevo.value = origen || "";
      origenNuevo.readOnly = true;
      origenNuevo.disabled = true;
      origenNuevo.style.backgroundColor = "#f3f4f6";
      origenNuevo.style.cursor = "not-allowed";
    }

    // DESTINO sincronizado
    const destinoPrincipal = document.getElementById("destino");
    const esperarDestinos = () => {
      if (destinoPrincipal.options.length > 0) {
        clonarOpcionesSelect(destinoPrincipal, destinoSelect, destinoPrincipal.value);
        destinoSelect.disabled = true;
        destinoSelect.style.pointerEvents = "none";
        destinoSelect.style.backgroundColor = "#f3f4f6";
        destinoSelect.style.cursor = "not-allowed";
      } else {
        setTimeout(esperarDestinos, 50);
      }
    };
    esperarDestinos();

    // PAQUETE sincronizado
    const paquetePrincipal = document.getElementById("paquete");
    const esperarPaquetes = () => {
      if (paquetePrincipal.options.length > 0) {
        clonarOpcionesSelect(paquetePrincipal, paqueteSelect, paquetePrincipal.value);
        paqueteSelect.disabled = true;
        paqueteSelect.style.pointerEvents = "none";
        paqueteSelect.style.backgroundColor = "#f3f4f6";
        paqueteSelect.style.cursor = "not-allowed";

        // 🔁 Forzar evento para que actualice precio
        paqueteSelect.dispatchEvent(new Event("change"));
      } else {
        setTimeout(esperarPaquetes, 50);
      }
    };
    esperarPaquetes();

    // Eliminar pasajero y actualizar precio
    section.querySelector('.remove-passenger').addEventListener('click', () => {
      section.remove();
      actualizarPrecioTotal();
    });
  }
  actualizarPrecioTotal();
  verificarLimitePasajerosPorPaquete();
}
