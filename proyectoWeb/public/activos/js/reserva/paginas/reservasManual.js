// js/reserva/paginas/reservasManual.js
/* ==============================================================================
Archivo: reservasManual.js
Descripción: Inicializa el formulario de reservas sin ningún destino o paquete 
             preseleccionado. Ideal para reservas directas desde la vista de reservas.
Usado por: reservasMain.js
=============================================================================== */
import { obtenerTodosLosDestinos } from '../servicios/reservasDestinosAPI.js';
import { obtenerPaquetesPorDestino } from '../servicios/reservasPaquetesAPI.js';
import { inicializarFormularioPasajeros } from './reservasFormulario.js';
import { actualizarPrecioTotal } from '../utilidades/reservasPrecios.js';
import { actualizarHorarios } from '../utilidades/actualizarHorarios.js';

export async function cargarModoManual() {
  inicializarFormularioPasajeros();

  setTimeout(async () => {
    const destinos = await obtenerTodosLosDestinos();
    console.log("📦 DESTINOS:", destinos);

    const destinoSelect = document.getElementById("destino");
    const paqueteSelect = document.getElementById("paquete");
    const paqueteOculto = document.getElementById("paquete_tipo_oculto");
    const horarioSelect = document.getElementById("horario");

    if (!destinoSelect || !paqueteSelect || !paqueteOculto || !horarioSelect) {
      console.error("❌ Uno o más elementos del DOM no se encontraron.");
      return;
    }

    // Llenar destinos
    destinoSelect.innerHTML = `<option value="">-- Selecciona destino --</option>`;
    destinos.forEach(dest => {
      destinoSelect.innerHTML += `<option value="${dest.destino_id}" data-precio="${dest.precio}">${dest.nombre.toUpperCase()}</option>`;
    });

    // Evento: cambio de destino
    destinoSelect.addEventListener("change", async () => {
      const destinoId = destinoSelect.value;
      const destino = destinos.find(d => d.destino_id == destinoId);

      // Reiniciar horarios
      actualizarHorarios(destino?.horarios || []);
      if (destino?.horarios?.length > 0) {
        horarioSelect.value = destino.horarios[0];
        horarioSelect.disabled = false;
        horarioSelect.classList.remove("cursor-not-allowed", "bg-gray-100");
      } else {
        horarioSelect.disabled = true;
        horarioSelect.classList.add("cursor-not-allowed", "bg-gray-100");
      }

      // Reiniciar paquetes
      paqueteSelect.innerHTML = `<option value="">-- Sin paquete --</option>`;
      const paquetes = await obtenerPaquetesPorDestino(destinoId);
      paquetes.forEach(p => {
        const opcion = document.createElement("option");
        opcion.value = p.seccion;
        opcion.dataset.precio = p.precio;
        opcion.textContent = `${p.nombre.toUpperCase()} - ${p.seccion.toUpperCase()}`;
        paqueteSelect.appendChild(opcion);
      });
      paqueteSelect.disabled = false;

      // Establecer precio base (sin paquete)
      paqueteOculto.value = "Ninguno";

      // ✅ Esperar a que todo se llene antes de calcular
      setTimeout(() => {
        actualizarPrecioTotal();
      }, 0);

      // Evento: cambio de paquete
      paqueteSelect.onchange = () => {
        paqueteOculto.value = paqueteSelect.value || "Ninguno";
        actualizarPrecioTotal();
      };
    });
  }, 50); // esperar al DOM

  // ❌ NO LLAMES actualizarPrecioTotal() aquí. Aún no hay destino ni paquete cargados.
}
