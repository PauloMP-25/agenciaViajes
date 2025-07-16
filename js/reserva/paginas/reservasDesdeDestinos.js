// js/reserva/paginas/reservasDesdeDestinos.js
/* ==============================================================================
Archivo: reservasDesdeDestinos.js
Descripción: Inicializa el formulario de reservas cuando el usuario viene desde 
             una tarjeta de destino (con ID de destino preseleccionado).
Usado por: reservasMain.js
=============================================================================== */
import { obtenerDestinoConPaquetes, obtenerTodosLosDestinos } from '../servicios/reservasDestinosAPI.js';
import { inicializarFormularioPasajeros } from './reservasFormulario.js';
import { actualizarPrecioTotal } from '../utilidades/reservasPrecios.js';
import { rellenarSelectDestinos } from '../componentes/rellenarSelectDestinos.js';
import { rellenarSelectPaquetes } from '../componentes/rellenarSelectPaquetes.js';
import { manejarCambioPaquete } from '../componentes/manejarCambioPaquetes.js';
import { actualizarHorarios } from '../utilidades/actualizarHorarios.js';

export async function inicializarDesdeDestino(destinoId) {
  inicializarFormularioPasajeros();
  actualizarPrecioTotal();

  const destinoInicial = await obtenerDestinoConPaquetes(destinoId);
  const listaDestinos = await obtenerTodosLosDestinos();

  if (!destinoInicial) {
    console.error("❌ Destino no encontrado.");
    return;
  }

  const destinoSelect = document.getElementById('destino');
  const paqueteSelect = document.getElementById('paquete');
  const paqueteOculto = document.getElementById("paquete_tipo_oculto");
  const horarioSelect = document.getElementById("horario");

  // 🟢 Cargar lista de destinos y seleccionar el actual
  rellenarSelectDestinos(destinoSelect, listaDestinos, destinoInicial.destino_id);

  const destinoCompleto = await obtenerDestinoConPaquetes(destinoInicial.destino_id);
  await actualizarPaquetes(destinoCompleto);

  // 🟢 Cargar horarios del destino seleccionado
  actualizarHorarios(destinoCompleto.horarios || []);
  if (destinoCompleto.horarios?.length > 0) {
    horarioSelect.value = destinoCompleto.horarios[0];
    horarioSelect.disabled = false;
    horarioSelect.classList.remove("cursor-not-allowed", "bg-gray-100");
  } else {
    horarioSelect.disabled = true;
    horarioSelect.classList.add("cursor-not-allowed", "bg-gray-100");
  }

  destinoSelect.addEventListener("change", async () => {
    const nuevoId = destinoSelect.value;
    if (!nuevoId) return;
    const nuevoDestino = await obtenerDestinoConPaquetes(nuevoId);
    await actualizarPaquetes(nuevoDestino);

    // 🟢 Actualizar horarios también
    actualizarHorarios(nuevoDestino.horarios || []);
    if (nuevoDestino.horarios?.length > 0) {
      horarioSelect.value = nuevoDestino.horarios[0];
      horarioSelect.disabled = false;
      horarioSelect.classList.remove("cursor-not-allowed", "bg-gray-100");
    } else {
      horarioSelect.disabled = true;
      horarioSelect.classList.add("cursor-not-allowed", "bg-gray-100");
    }
  });

  async function actualizarPaquetes(destinoNuevo) {
    rellenarSelectPaquetes(paqueteSelect, destinoNuevo.paquetes || []);
    manejarCambioPaquete(paqueteSelect, paqueteOculto);
    actualizarPrecioTotal();
  }
}
