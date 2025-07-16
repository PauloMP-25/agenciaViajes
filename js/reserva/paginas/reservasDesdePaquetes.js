// js/reserva/paginas/reservasDesdePaquetes.js
/* ==============================================================================
Archivo: reservasDesdePaquetes.js
Descripción: Inicializa el formulario de reservas cuando el usuario hace clic 
             desde una tarjeta de paquete (con ID de paquete preseleccionado).
Usado por: reservasMain.js
=============================================================================== */
import { obtenerPaqueteYDestino } from '../servicios/reservasPaquetesAPI.js';
import { obtenerDestinoConPaquetes, obtenerTodosLosDestinos } from '../servicios/reservasDestinosAPI.js';
import { inicializarFormularioPasajeros } from './reservasFormulario.js';
import { actualizarPrecioTotal } from '../utilidades/reservasPrecios.js';
import { rellenarSelectDestinos } from '../componentes/rellenarSelectDestinos.js';
import { rellenarSelectPaquetes } from '../componentes/rellenarSelectPaquetes.js';
import { manejarCambioPaquete } from '../componentes/manejarCambioPaquetes.js';
import { actualizarHorarios } from '../utilidades/actualizarHorarios.js';

export async function inicializarDesdePaquete(paqueteId) {
  inicializarFormularioPasajeros();
  actualizarPrecioTotal();

  const data = await obtenerPaqueteYDestino(paqueteId);
  if (!data?.destino || !data?.paquete) return;

  const { destino, paquete } = data;
  const listaDestinos = await obtenerTodosLosDestinos();

  const destinoSelect = document.getElementById('destino');
  const paqueteSelect = document.getElementById('paquete');
  const paqueteOculto = document.getElementById("paquete_tipo_oculto");
  const horarioSelect = document.getElementById("horario");

  // 🟢 Cargar lista de destinos y marcar el actual
  rellenarSelectDestinos(destinoSelect, listaDestinos, destino.destino_id);

  // 🟢 Cargar lista de paquetes del destino actual
  const destinoCompleto = await obtenerDestinoConPaquetes(destino.destino_id);
  await actualizarPaquetes(destinoCompleto, paquete.paquete_id);

  // 🟢 Actualizar horarios con la nueva función modular
  actualizarHorarios(destino.horarios || []);

  if (destino.horarios?.length > 0) {
    horarioSelect.value = destino.horarios[0];
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

    // 🟢 Actualizar horarios al cambiar de destino
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

  async function actualizarPaquetes(destinoNuevo, idPaquete = null) {
    rellenarSelectPaquetes(paqueteSelect, destinoNuevo.paquetes || [], idPaquete);
    actualizarPrecioTotal();
    manejarCambioPaquete(paqueteSelect, paqueteOculto);
  }
}
