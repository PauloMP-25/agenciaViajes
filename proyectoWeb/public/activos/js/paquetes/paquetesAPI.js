// js/paquetes/paquetesAPI.js
import { fetchJSON } from '../api/apiHelper.js';

/**
 * Obtiene todos los paquetes desde el backend.
 * Solo incluye destinos que tienen paquetes almacenados.
 * Devuelve la lista como JSON o [] en caso de error.
 */

// ✅ Obtener todos los paquetes
export const fetchPaquetes = () =>
  fetchJSON("/api/paquetes", []);