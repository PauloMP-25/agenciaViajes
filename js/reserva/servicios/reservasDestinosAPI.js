// js/reservas/servicios/reservasDestinosAPI.js
/* ==============================================================================
Archivo: reservasDestinosAPI.js
Descripción: Proporciona funciones para obtener los destinos con o sin paquetes 
             desde la base de datos vía API REST.
Usado por: reservasDesdeDestinos.js, reservasFormulario.js, reservasMain.js
=============================================================================== */
import { fetchJSON } from '../../api/apiHelper.js';
/**
 * Obtener un destino junto a sus paquetes desde la API
 * Ejemplo de respuesta esperada:
 * {
 *   destino_id: 1,
 *   nombre: "Cusco",
 *   precio: 80.00,
 *   paquetes: [
 *     { tipo: "Básico", precio: 30.00 },
 *     { tipo: "Premium", precio: 60.00 }
 *   ]
 * }
 */
// ✅ Obtener el destino buscado con sus paquetes
export const obtenerDestinoConPaquetes = (destinoId) =>
  fetchJSON(`/api/reservas/destinos/${destinoId}/con-paquetes`, null);

// ✅ Obtener todos los destinos disponibles (desde consultaDestinos)
export const obtenerTodosLosDestinos = () =>
  fetchJSON("/api/destinos", []);
